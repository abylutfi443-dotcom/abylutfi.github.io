// Data Produk THXNSM
const thxnsmProducts = [
  {
    id: 1,
    name: 'THXNSM Signature Black',
    category: 'signature',
    price: 145000,
    originalPrice: 175000,
    description: 'The iconic THXNSM signature tee in premium black cotton. Features our signature logo print on chest and subtle branding details.',
    colors: ['Black', 'White', 'Gray', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'signature-black',
    badge: 'SIGNATURE',
    features: ['Premium 30s Cotton', 'Signature Logo Print', 'Reinforced Neck & Hems', 'Oversize Regular Fit', 'Made in Indonesia'],
    fabric: '100% Cotton 30s',
    weight: '220 GSM',
    fit: 'Oversize Regular',
  },
  {
    id: 2,
    name: 'Urban Abstract Graphic',
    category: 'graphic',
    price: 165000,
    originalPrice: 195000,
    description: 'Limited edition graphic tee featuring abstract urban artwork. Each piece is a statement piece for your streetwear collection.',
    colors: ['White', 'Ash Gray', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'abstract-graphic',
    badge: 'GRAPHIC',
    features: ['High-Quality DTG Print', 'Abstract Design', 'Street Style', 'Limited Stock', 'Unisex Fit'],
    fabric: '100% Ring-Spun Cotton',
    weight: '240 GSM',
    fit: 'Oversize Relaxed',
  },
  {
    id: 3,
    name: 'Neon Accents Drop',
    category: 'limited',
    price: 155000,
    originalPrice: 185000,
    description: 'Limited drop featuring neon-accented designs that glow under UV light. Only 500 pieces produced worldwide.',
    colors: ['Black', 'Navy'],
    sizes: ['M', 'L', 'XL'],
    image: 'neon-drop',
    badge: 'LIMITED',
    features: ['UV Reactive Ink', 'Limited to 500 pcs', 'Numbered Tag', 'Special Packaging', "Collector's Item"],
    fabric: '100% Cotton',
    weight: '230 GSM',
    fit: 'Oversize',
  },
  {
    id: 4,
    name: 'Minimalist Script Tee',
    category: 'signature',
    price: 135000,
    originalPrice: 165000,
    description: 'Clean minimalist design with script lettering. Perfect for layering or wearing solo for a clean aesthetic look.',
    colors: ['White', 'Black', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'script-tee',
    badge: 'MINIMAL',
    features: ['Minimalist Design', 'Soft Hand Feel', 'Versatile Styling', 'Premium Stitching', 'Everyday Essential'],
    fabric: '100% Combed Cotton',
    weight: '210 GSM',
    fit: 'Oversize Slim',
  },
  {
    id: 5,
    name: 'Artist Collab: Street Tales',
    category: 'collab',
    price: 195000,
    originalPrice: 235000,
    description: 'Collaboration with local street artist featuring exclusive artwork. Each piece includes certificate of authenticity.',
    colors: ['White', 'Black'],
    sizes: ['M', 'L'],
    image: 'artist-collab',
    badge: 'COLLAB',
    features: ['Artist Signed', 'Certificate of Auth', 'Limited Edition', 'Collector Packaging', 'Support Local Artists'],
    fabric: 'Premium Cotton',
    weight: '250 GSM',
    fit: 'Oversize Boxy',
  },
  {
    id: 6,
    name: 'Technical Pocket Tee',
    category: 'graphic',
    price: 175000,
    originalPrice: 205000,
    description: 'Technical tee with functional chest pocket and utility-inspired design details. For the modern urban explorer.',
    colors: ['Gray', 'Black', 'Army Green'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'pocket-tee',
    badge: 'UTILITY',
    features: ['Functional Chest Pocket', 'Technical Design', 'Durable Construction', 'Utility Style', 'Modern Fit'],
    fabric: 'Cotton-Poly Blend',
    weight: '235 GSM',
    fit: 'Oversize Technical',
  },
];

// DOM Elements
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.querySelector('.products-grid');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const statItems = document.querySelectorAll('.stat-item h3');
const contactForm = document.getElementById('contactForm');
const newsletterBtn = document.getElementById('newsletterBtn');
const newsletterMessage = document.getElementById('newsletterMessage');
const currentYear = document.getElementById('currentYear');
const quickOrderModal = document.getElementById('quickOrderModal');
const quickOrderContent = document.getElementById('quickOrderContent');
const closeModalBtns = document.querySelectorAll('.close-modal');
const sizeBtn = document.getElementById('sizeBtn');
const sizeModal = document.getElementById('sizeModal');

// Google Apps Script URL (GANTI DENGAN URL ANDA)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw.../exec';

// State variables
let currentTestimonial = 0;
let testimonialInterval;

// Initialize Application
document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  currentYear.textContent = new Date().getFullYear();

  // Initialize products
  renderProducts();

  // Initialize event listeners
  setupEventListeners();

  // Initialize animations
  initAnimations();

  // Initialize testimonial slider
  initTestimonialSlider();
});

// Render Products
function renderProducts(filter = 'all') {
  productsGrid.innerHTML = '';

  const filteredProducts = filter === 'all' ? thxnsmProducts : thxnsmProducts.filter((product) => product.category === filter);

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <i class="fas fa-tshirt" style="font-size: 3.5rem; color: #e0e0e0; margin-bottom: 20px;"></i>
                <h3 style="color: var(--gray-color); margin-bottom: 10px;">Coming Soon</h3>
                <p style="color: var(--gray-color);">New collection dropping soon. Stay tuned!</p>
            </div>
        `;
    return;
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.category = product.category;
    productCard.dataset.id = product.id;

    // Calculate discount percentage
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    productCard.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            ${discount > 0 ? `<span class="product-badge" style="left: auto; right: 20px; background-color: var(--success-color);">-${discount}%</span>` : ''}
            
            <div class="product-image">
                <div class="product-overlay">
                    <h4>${product.name}</h4>
                    <p>${product.description.substring(0, 120)}...</p>
                    <button class="quick-view-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
            </div>
            
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="product-category">${getCategoryName(product.category)}</span>
                
                <div class="product-price">
                    <span class="current-price">Rp ${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">Rp ${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                
                <div class="product-specs">
                    <span class="spec"><i class="fas fa-weight"></i> ${product.weight}</span>
                    <span class="spec"><i class="fas fa-ruler"></i> ${product.fit}</span>
                </div>
                
                <div class="product-actions">
                    <button class="buy-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="wishlist-btn" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

    productsGrid.appendChild(productCard);
  });

  // Add event listeners to product buttons
  setupProductEventListeners();
}

// Setup product event listeners
function setupProductEventListeners() {
  document.querySelectorAll('.quick-view-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const productId = parseInt(this.dataset.id);
      openQuickOrderModal(productId);
    });
  });

  document.querySelectorAll('.buy-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const productId = parseInt(this.dataset.id);
      openQuickOrderModal(productId);
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const productId = parseInt(this.dataset.id);
      toggleWishlist(productId);
    });
  });
}

// Open Quick Order Modal
function openQuickOrderModal(productId) {
  const product = thxnsmProducts.find((p) => p.id === productId);
  if (!product) return;

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  quickOrderContent.innerHTML = `
        <div class="quick-order-content">
            <div class="product-modal-header">
                <h2>${product.name}</h2>
                <span class="product-category">${getCategoryName(product.category)}</span>
            </div>
            
            <div class="product-modal-body">
                <div class="product-images">
                    <div class="main-image">
                        <!-- Main product image -->
                    </div>
                </div>
                
                <div class="product-details">
                    <div class="price-section">
                        <div class="current-price">Rp ${formatPrice(product.price)}</div>
                        ${
                          product.originalPrice
                            ? `
                            <div class="original-price-container">
                                <span class="original-price">Rp ${formatPrice(product.originalPrice)}</span>
                                ${discount > 0 ? `<span class="discount-badge">-${discount}% OFF</span>` : ''}
                            </div>
                        `
                            : ''
                        }
                    </div>
                    
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    
                    <div class="product-specifications">
                        <div class="spec-item">
                            <i class="fas fa-tshirt"></i>
                            <div>
                                <strong>Fabric:</strong>
                                <span>${product.fabric}</span>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-weight"></i>
                            <div>
                                <strong>Weight:</strong>
                                <span>${product.weight}</span>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-ruler"></i>
                            <div>
                                <strong>Fit:</strong>
                                <span>${product.fit}</span>
                            </div>
                        </div>
                    </div>
                    
                    <form id="quickOrderForm" class="quick-order-form">
                        <div class="form-section">
                            <h4>Select Color:</h4>
                            <div class="color-options">
                                ${product.colors
                                  .map(
                                    (color) => `
                                    <label class="color-option">
                                        <input type="radio" name="color" value="${color}" required>
                                        <span class="color-dot" style="background-color: ${getColorHex(color)}"></span>
                                        <span class="color-name">${color}</span>
                                    </label>
                                `
                                  )
                                  .join('')}
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h4>Select Size:</h4>
                            <div class="size-options">
                                ${product.sizes
                                  .map(
                                    (size) => `
                                    <label class="size-option">
                                        <input type="radio" name="size" value="${size}" required>
                                        <span>${size}</span>
                                    </label>
                                `
                                  )
                                  .join('')}
                            </div>
                            <a href="#size" class="size-guide-link" onclick="closeAllModals()">
                                <i class="fas fa-ruler"></i> View Size Guide
                            </a>
                        </div>
                        
                        <div class="form-section">
                            <h4>Quantity:</h4>
                            <div class="quantity-selector">
                                <button type="button" class="quantity-btn minus">-</button>
                                <input type="number" name="quantity" value="1" min="1" max="10" readonly>
                                <button type="button" class="quantity-btn plus">+</button>
                            </div>
                        </div>
                        
                        <div class="action-buttons">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-shopping-cart"></i> Add to Cart - Rp ${formatPrice(product.price)}
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="buyNow(${product.id})">
                                <i class="fas fa-bolt"></i> Buy Now
                            </button>
                        </div>
                    </form>
                    
                    <div class="product-features">
                        <h4>Product Features:</h4>
                        <ul>
                            ${product.features.map((feature) => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

  openModal(quickOrderModal);

  // Setup quantity selector
  setupQuantitySelector();

  // Setup form submission
  const quickOrderForm = document.getElementById('quickOrderForm');
  if (quickOrderForm) {
    quickOrderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleQuickOrder(product);
    });
  }
}

// Handle Quick Order
function handleQuickOrder(product) {
  const form = document.getElementById('quickOrderForm');
  const formData = new FormData(form);

  const orderData = {
    productId: product.id,
    productName: product.name,
    color: formData.get('color'),
    size: formData.get('size'),
    quantity: parseInt(formData.get('quantity')),
    price: product.price,
    total: product.price * parseInt(formData.get('quantity')),
    timestamp: new Date().toISOString(),
  };

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
  submitBtn.disabled = true;

  // In a real app, you would send this to your backend
  setTimeout(() => {
    // Show success message
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart!';
    submitBtn.style.backgroundColor = 'var(--success-color)';

    // Reset button after 2 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.backgroundColor = '';
      submitBtn.disabled = false;

      // Close modal after successful add
      setTimeout(() => {
        closeAllModals();
        showNotification('Product added to cart successfully!', 'success');
      }, 500);
    }, 2000);
  }, 1500);
}

// Setup quantity selector
function setupQuantitySelector() {
  document.querySelectorAll('.quantity-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      let value = parseInt(input.value);

      if (this.classList.contains('minus') && value > 1) {
        value--;
      } else if (this.classList.contains('plus') && value < 10) {
        value++;
      }

      input.value = value;
    });
  });
}

// Buy Now function
function buyNow(productId) {
  const product = thxnsmProducts.find((p) => p.id === productId);
  if (!product) return;

  // Redirect to checkout or handle buy now logic
  window.location.href = `#contact?product=${productId}`;
  closeAllModals();
  showNotification(`Redirecting to order ${product.name}...`, 'info');
}

// Toggle Wishlist
function toggleWishlist(productId) {
  const product = thxnsmProducts.find((p) => p.id === productId);
  if (!product) return;

  const btn = document.querySelector(`.wishlist-btn[data-id="${productId}"]`);
  const icon = btn.querySelector('i');

  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    btn.style.color = 'var(--accent-color)';
    showNotification(`${product.name} added to wishlist`, 'success');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    btn.style.color = '';
    showNotification(`${product.name} removed from wishlist`, 'info');
  }
}

// Get Category Name
function getCategoryName(category) {
  const categories = {
    signature: 'Signature Series',
    graphic: 'Graphic Tees',
    limited: 'Limited Drop',
    collab: 'Collaborations',
    all: 'All Products',
  };

  return categories[category] || category;
}

// Format Price
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Get Color Hex
function getColorHex(color) {
  const colors = {
    Black: '#000000',
    White: '#FFFFFF',
    Gray: '#808080',
    Navy: '#000080',
    Olive: '#808000',
    'Ash Gray': '#B2BEB5',
    Sand: '#C2B280',
    Cream: '#FFFDD0',
    'Army Green': '#4B5320',
  };

  return colors[color] || '#CCCCCC';
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile Menu Toggle
  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.nav-container') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });

  // Navbar scroll effect
  window.addEventListener('scroll', handleScroll);

  // Active nav link on scroll
  window.addEventListener('scroll', setActiveNavLink);

  // Portfolio Filter
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Filter products
      const filter = this.dataset.filter;
      renderProducts(filter);
    });
  });

  // Close Modal
  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  // Close modal when clicking outside
  window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
      closeAllModals();
    }
  });

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Newsletter Submission
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', handleNewsletterSubmit);
  }

  // Size Guide Modal
  if (sizeBtn) {
    sizeBtn.addEventListener('click', () => openModal(sizeModal));
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        // Close mobile menu if open
        navMenu.classList.remove('active');

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 90,
          behavior: 'smooth',
        });

        // Update active nav link
        updateActiveNavLink(href);
      }
    });
  });

  // Product links in footer
  document.querySelectorAll('[data-filter]').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const filter = this.dataset.filter;

      // Close mobile menu if open
      navMenu.classList.remove('active');

      // Scroll to products section
      document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Filter products
      setTimeout(() => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${filter}"]`)?.classList.add('active');
        renderProducts(filter);
      }, 1000);
    });
  });

  // WhatsApp float button
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // In a real app, this would open WhatsApp with a pre-filled message
      window.open('https://wa.me/6281234567890?text=Hi%20THXNSM,%20I%20want%20to%20order%20...', '_blank');
    });
  }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  menuToggle.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

// Handle Scroll
function handleScroll() {
  // Navbar scroll effect
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Animate counters when in viewport
  if (isElementInViewport(document.querySelector('.hero-stats'))) {
    animateCounters();
  }
}

// Set Active Nav Link on Scroll
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      updateActiveNavLink('#' + sectionId);
    }
  });
}

// Update Active Nav Link
function updateActiveNavLink(href) {
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === href) {
      link.classList.add('active');
    }
  });
}

// Initialize Animations
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.product-card, .lookbook-item, .platform-card').forEach((el) => {
    observer.observe(el);
  });
}

// Initialize Testimonial Slider
function initTestimonialSlider() {
  // Set initial active slide
  showTestimonial(currentTestimonial);

  // Next slide
  testimonialNext.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  });

  // Previous slide
  testimonialPrev.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  });

  // Dot click
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
    });
  });

  // Auto slide every 5 seconds
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}

// Show specific testimonial
function showTestimonial(index) {
  // Hide all slides
  testimonialSlides.forEach((slide) => {
    slide.classList.remove('active');
  });

  // Remove active from all dots
  testimonialDots.forEach((dot) => {
    dot.classList.remove('active');
  });

  // Show current slide
  testimonialSlides[index].classList.add('active');
  testimonialDots[index].classList.add('active');

  // Reset auto-slide timer
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}

// Animate Counters
function animateCounters() {
  statItems.forEach((stat) => {
    if (!stat.classList.contains('animated')) {
      const target = parseFloat(stat.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      const hasDecimal = stat.textContent.includes('.');

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = hasDecimal ? target.toFixed(1) : target;
          clearInterval(timer);
          stat.classList.add('animated');
        } else {
          stat.textContent = hasDecimal ? current.toFixed(1) : Math.floor(current);
        }
      }, 16);
    }
  });
}

// Open Modal
function openModal(modal) {
  closeAllModals();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close All Modals
function closeAllModals() {
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = 'auto';
}

// Handle Contact Form Submission
async function handleContactSubmit(e) {
  e.preventDefault();

  // Get form elements
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const inquiry = document.getElementById('inquiry');
  const message = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.loading-spinner');
  const formMessage = document.getElementById('formMessage');

  // Reset error messages
  clearErrorMessages();
  formMessage.style.display = 'none';

  // Validate form
  let isValid = true;

  if (!name.value.trim()) {
    showError('nameError', 'Full name is required');
    isValid = false;
  }

  if (!email.value.trim()) {
    showError('emailError', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError('emailError', 'Please enter a valid email');
    isValid = false;
  }

  if (!phone.value.trim()) {
    showError('phoneError', 'WhatsApp number is required');
    isValid = false;
  }

  if (!inquiry.value) {
    showError('inquiryError', 'Please select inquiry type');
    isValid = false;
  }

  if (!message.value.trim()) {
    showError('messageError', 'Message is required');
    isValid = false;
  }

  if (!isValid) return;

  // Prepare data
  const formData = {
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    inquiry: inquiry.value,
    message: message.value.trim(),
    newsletter: document.getElementById('newsletter')?.checked || false,
    timestamp: new Date().toISOString(),
  };

  // Show loading state
  btnText.style.display = 'none';
  spinner.style.display = 'block';
  submitBtn.disabled = true;

  try {
    // Send data to Google Sheets (if URL is configured)
    if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('...')) {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showFormMessage("Message sent successfully! We'll get back to you within 24 hours.", 'success');
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } else {
      // Simulate success for demo
      setTimeout(() => {
        showFormMessage("Message sent successfully! We'll get back to you within 24 hours.", 'success');
      }, 1500);
    }
  } catch (error) {
    console.error('Submission error:', error);
    showFormMessage(`Failed to send message: ${error.message}. Please try again or contact us directly.`, 'error');
  } finally {
    // Hide loading state
    btnText.style.display = 'block';
    spinner.style.display = 'none';
    submitBtn.disabled = false;

    // Reset form on success
    if (formMessage.classList.contains('success')) {
      contactForm.reset();
    }

    // Scroll to form message
    if (formMessage.style.display === 'block') {
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Handle Newsletter Submission
async function handleNewsletterSubmit() {
  const emailInput = document.getElementById('newsletterEmail');
  const email = emailInput.value.trim();

  if (!email) {
    showNewsletterMessage('Email is required', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNewsletterMessage('Please enter a valid email', 'error');
    return;
  }

  // Show loading
  showNewsletterMessage('Subscribing...', 'info');

  try {
    // Send to Google Sheets (if configured)
    if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('...')) {
      const newsletterData = {
        email: email,
        type: 'newsletter',
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsletterData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showNewsletterMessage('Successfully subscribed to THXNSM newsletter!', 'success');
        emailInput.value = '';
      } else {
        throw new Error(result.error || 'Failed to subscribe');
      }
    } else {
      // Simulate success for demo
      setTimeout(() => {
        showNewsletterMessage('Successfully subscribed to THXNSM newsletter!', 'success');
        emailInput.value = '';
      }, 1500);
    }
  } catch (error) {
    console.error('Newsletter error:', error);
    showNewsletterMessage('Failed to subscribe. Please try again.', 'error');
  }

  // Reset message after 3 seconds
  setTimeout(() => {
    newsletterMessage.style.display = 'none';
  }, 3000);
}

// Show Newsletter Message
function showNewsletterMessage(message, type) {
  newsletterMessage.textContent = message;
  newsletterMessage.className = '';
  newsletterMessage.classList.add(type);
  newsletterMessage.style.display = 'block';
}

// Show Form Message
function showFormMessage(message, type) {
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = message;
  formMessage.className = 'form-message';
  formMessage.classList.add(type);
  formMessage.style.display = 'block';
}

// Show Error Message
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
  }
}

// Clear Error Messages
function clearErrorMessages() {
  document.querySelectorAll('.error-message').forEach((element) => {
    element.textContent = '';
  });
}

// Show Notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

  // Add to body
  document.body.appendChild(notification);

  // Add close button event
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.remove();
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Validate Email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
}

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 30px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid;
        max-width: 350px;
    }
    
    .notification.success {
        border-left-color: var(--success-color);
    }
    
    .notification.error {
        border-left-color: var(--accent-color);
    }
    
    .notification.info {
        border-left-color: var(--dark-color);
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: var(--success-color);
    }
    
    .notification.error i {
        color: var(--accent-color);
    }
    
    .notification.info i {
        color: var(--dark-color);
    }
    
    .notification span {
        flex: 1;
        font-size: 0.95rem;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-color);
        cursor: pointer;
        padding: 5px;
        font-size: 1rem;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Add quick order modal styles
const quickOrderStyles = `
    .quick-order-content {
        max-width: 100%;
    }
    
    .product-modal-header {
        margin-bottom: 25px;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 20px;
    }
    
    .product-modal-header h2 {
        font-size: 1.8rem;
        margin-bottom: 8px;
        color: var(--dark-color);
    }
    
    .product-modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
    
    @media (max-width: 768px) {
        .product-modal-body {
            grid-template-columns: 1fr;
        }
    }
    
    .product-images {
        background: #f8f9fa;
        border-radius: 15px;
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 300px;
    }
    
    .product-details {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    
    .price-section {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 12px;
    }
    
    .price-section .current-price {
        font-size: 2rem;
        font-weight: 800;
        color: var(--dark-color);
        margin-bottom: 8px;
    }
    
    .original-price-container {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .original-price {
        font-size: 1.2rem;
        color: var(--gray-color);
        text-decoration: line-through;
    }
    
    .discount-badge {
        background: var(--success-color);
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 700;
    }
    
    .product-description p {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--gray-color);
    }
    
    .product-specifications {
        display: flex;
        flex-direction: column;
        gap: 15px;
        background: #f8f9fa;
        padding: 20px;
        border-radius: 12px;
    }
    
    .spec-item {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .spec-item i {
        color: var(--accent-color);
        font-size: 1.2rem;
        width: 24px;
    }
    
    .spec-item strong {
        color: var(--dark-color);
        margin-right: 5px;
    }
    
    .form-section {
        margin-bottom: 25px;
    }
    
    .form-section h4 {
        margin-bottom: 15px;
        color: var(--dark-color);
        font-size: 1.1rem;
    }
    
    .color-options {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }
    
    .color-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .color-option input {
        display: none;
    }
    
    .color-option input:checked + .color-dot {
        transform: scale(1.2);
        box-shadow: 0 0 0 2px var(--accent-color);
    }
    
    .color-option input:checked ~ .color-name {
        font-weight: 700;
        color: var(--dark-color);
    }
    
    .color-option:hover {
        border-color: var(--accent-color);
    }
    
    .color-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
    }
    
    .size-options {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .size-option {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: var(--transition);
    }
    
    .size-option input {
        display: none;
    }
    
    .size-option input:checked + span {
        color: white;
        background: var(--accent-color);
        border-color: var(--accent-color);
    }
    
    .size-option:hover {
        border-color: var(--accent-color);
    }
    
    .size-guide-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--accent-color);
        text-decoration: none;
        font-size: 0.9rem;
        margin-top: 15px;
        font-weight: 600;
    }
    
    .quantity-selector {
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 150px;
    }
    
    .quantity-btn {
        width: 40px;
        height: 40px;
        border: 2px solid #e0e0e0;
        background: white;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .quantity-btn:hover {
        border-color: var(--accent-color);
        color: var(--accent-color);
    }
    
    .quantity-selector input {
        width: 60px;
        height: 40px;
        text-align: center;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
    }
    
    .product-features {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 2px solid #f0f0f0;
    }
    
    .product-features h4 {
        margin-bottom: 15px;
        color: var(--dark-color);
        font-size: 1.1rem;
    }
    
    .product-features ul {
        list-style: none;
        padding: 0;
    }
    
    .product-features li {
        margin-bottom: 10px;
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }
    
    .product-features i {
        color: var(--success-color);
        margin-top: 3px;
    }
    
    .product-specs {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
    }
    
    .product-specs .spec {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 0.8rem;
        color: var(--gray-color);
        background: #f8f9fa;
        padding: 5px 10px;
        border-radius: 15px;
    }
`;

// Add styles to document
const style = document.createElement('style');
style.textContent = notificationStyles + quickOrderStyles;
document.head.appendChild(style);

// Initialize the app
window.onload = function () {
  console.log('THXNSM Website Loaded Successfully');
  console.log('🚀 Premium Oversize Streetwear');
  console.log('📍 Made in Indonesia');
};
