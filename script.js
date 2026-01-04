// KONFIGURASI GOOGLE FORM

const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd3L4007RaOVgqJKkLSbzgpE5vDi60ry6qt-wY8j6h-OZfdnw/viewform',
  entryIds: {
    nama: 'entry.1312558889',
    telepon: 'entry.1881878601',
    email: 'entry.525922799',
    pesan: 'entry.1426887330',
  },
};

// SMOOTH SCROLL UNTUK NAVIGATION LINKS

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// CONTACT FORM HANDLING - TERHUBUNG DENGAN GOOGLE FORM

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value;
  const phone = this.querySelector('input[type="tel"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const packageSelect = this.querySelector('select').value;
  const message = this.querySelector('textarea').value;

  const fullMessage = `Paket yang Diminati: ${packageSelect}\n\n${message}`;

  const prefillUrl =
    `${GOOGLE_FORM_CONFIG.formUrl}?` +
    `${GOOGLE_FORM_CONFIG.entryIds.nama}=${encodeURIComponent(name)}&` +
    `${GOOGLE_FORM_CONFIG.entryIds.telepon}=${encodeURIComponent(phone)}&` +
    `${GOOGLE_FORM_CONFIG.entryIds.email}=${encodeURIComponent(email)}&` +
    `${GOOGLE_FORM_CONFIG.entryIds.pesan}=${encodeURIComponent(fullMessage)}`;

  window.open(prefillUrl, '_blank');

  alert(`Terima kasih ${name}!\n\nGoogle Form akan dibuka di tab baru dengan data Anda sudah terisi.\n\nSilakan klik "Submit" di Google Form untuk mengirim pesan.`);

  this.reset();
});

// NAVBAR ACTIVE STATE BASED ON SCROLL

window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// NAVBAR SHADOW EFFECT ON SCROLL

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

// ANIMATION ON SCROLL FOR CARDS

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.card').forEach((card) => {
  observer.observe(card);
});

// COUNTER ANIMATION FOR STATISTICS

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '%');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '%');
    }
  }, 30);
}

const aboutSection = document.querySelector('#about');
let counterAnimated = false;

const aboutObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterAnimated) {
        const counters = document.querySelectorAll('#about h4');
        counters.forEach((counter) => {
          const target = parseInt(counter.textContent.replace(/\D/g, ''));
          if (target) {
            counter.textContent = '0';
            animateCounter(counter, target);
          }
        });
        counterAnimated = true;
      }
    });
  },
  { threshold: 0.3 }
);

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}
