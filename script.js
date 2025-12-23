// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      mobileMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  });
});

// Form validation and submission
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const backToFormBtn = document.getElementById('backToForm');

// Error elements
const errorElements = {
  fullName: document.getElementById('fullNameError'),
  email: document.getElementById('emailError'),
  phone: document.getElementById('phoneError'),
  age: document.getElementById('ageError'),
  emergencyContact: document.getElementById('emergencyContactError'),
  terms: document.getElementById('termsError'),
};

// Clear error messages
function clearErrors() {
  Object.values(errorElements).forEach((element) => {
    element.textContent = '';
  });

  // Remove error styling from inputs
  const inputs = registrationForm.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    input.style.borderColor = '#ddd';
  });
}

// Validate individual field
function validateField(fieldId, value) {
  let isValid = true;
  let errorMessage = '';

  switch (fieldId) {
    case 'fullName':
      if (!value.trim()) {
        errorMessage = 'Nama lengkap harus diisi';
        isValid = false;
      } else if (value.trim().length < 3) {
        errorMessage = 'Nama minimal 3 karakter';
        isValid = false;
      }
      break;

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMessage = 'Email harus diisi';
        isValid = false;
      } else if (!emailRegex.test(value)) {
        errorMessage = 'Format email tidak valid';
        isValid = false;
      }
      break;

    case 'phone':
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      if (!value.trim()) {
        errorMessage = 'Nomor telepon harus diisi';
        isValid = false;
      } else if (!phoneRegex.test(value)) {
        errorMessage = 'Format nomor telepon tidak valid';
        isValid = false;
      }
      break;

    case 'age':
      if (!value) {
        errorMessage = 'Usia harus diisi';
        isValid = false;
      } else if (value < 17 || value > 60) {
        errorMessage = 'Usia harus antara 17 dan 60 tahun';
        isValid = false;
      }
      break;

    case 'emergencyContact':
      if (!value.trim()) {
        errorMessage = 'Kontak darurat harus diisi';
        isValid = false;
      } else if (value.trim().length < 5) {
        errorMessage = 'Kontak darurat minimal 5 karakter';
        isValid = false;
      }
      break;

    case 'terms':
      const termsCheckbox = document.getElementById('terms');
      if (!termsCheckbox.checked) {
        errorMessage = 'Anda harus menyetujui syarat dan ketentuan';
        isValid = false;
      }
      break;
  }

  return { isValid, errorMessage };
}

// Real-time validation
registrationForm.querySelectorAll('input, select').forEach((field) => {
  field.addEventListener('blur', function () {
    const fieldId = this.id;
    const value = this.value;

    if (fieldId && errorElements[fieldId]) {
      const validation = validateField(fieldId, value);

      if (!validation.isValid) {
        errorElements[fieldId].textContent = validation.errorMessage;
        this.style.borderColor = 'var(--error-color)';
      } else {
        errorElements[fieldId].textContent = '';
        this.style.borderColor = '#ddd';
      }
    }
  });
});

// Terms checkbox validation
const termsCheckbox = document.getElementById('terms');
termsCheckbox.addEventListener('change', function () {
  const validation = validateField('terms', this.checked);

  if (!validation.isValid) {
    errorElements.terms.textContent = validation.errorMessage;
  } else {
    errorElements.terms.textContent = '';
  }
});

// Form submission
// URL Google Apps Script Web App (GANTI DENGAN URL ANDA)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzd3OTEkQLU0Z9eCkDtwCnraselTNE-LzD-PAaS9mA45j9AxpxupDlJ7jXjtCa7Xt8R3w/exec';

// Form submission
registrationForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearErrors();

  let isValid = true;
  const formData = new FormData(this);
  const formObject = {};

  // Validate all required fields
  formData.forEach((value, key) => {
    formObject[key] = value;

    if (key !== 'healthInfo' && key !== 'experience' && key !== 'package') {
      const validation = validateField(key, value);

      if (!validation.isValid) {
        errorElements[key].textContent = validation.errorMessage;
        const fieldElement = document.getElementById(key);
        if (fieldElement) {
          fieldElement.style.borderColor = 'var(--error-color)';
        }
        isValid = false;
      }
    }
  });

  // Validate terms separately
  const termsValidation = validateField('terms', termsCheckbox.checked);
  if (!termsValidation.isValid) {
    errorElements.terms.textContent = termsValidation.errorMessage;
    isValid = false;
  }

  if (!isValid) {
    // Scroll to first error
    const firstError = document.querySelector('.error-message:not(:empty)');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Tampilkan loading
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Mengirim...';
  submitBtn.disabled = true;

  try {
    // Format data untuk Google Sheets
    const sheetData = {
      timestamp: new Date().toISOString(),
      nama_lengkap: formObject.fullName,
      email: formObject.email,
      telepon: formObject.phone,
      usia: formObject.age,
      pengalaman: formObject.experience,
      paket: formObject.package,
      kontak_darurat: formObject.emergencyContact,
      info_kesehatan: formObject.healthInfo || '',
      terms_accepted: 'Ya',
      submitted_at: new Date().toLocaleString('id-ID'),
    };

    console.log('Mengirim data ke Google Sheets:', sheetData);

    // Kirim ke Google Sheets
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Mode no-cors untuk menghindari CORS error
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });

    // Karena mode 'no-cors', kita tidak bisa membaca response
    // Tapi data tetap dikirim ke Google Sheets

    console.log('Data berhasil dikirim ke Google Sheets');

    // Show success message and hide form
    registrationForm.style.display = 'none';
    successMessage.style.display = 'block';

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reset form
    registrationForm.reset();

    // Kirim juga via email fallback (optional)
    sendFallbackEmail(sheetData);
  } catch (error) {
    console.error('Error mengirim data:', error);

    // Fallback: Tampilkan data untuk copy manual
    alert(`Gagal mengirim formulir otomatis. Silakan copy data berikut dan kirim ke admin:\n\nNama: ${formObject.fullName}\nEmail: ${formObject.email}\nTelepon: ${formObject.phone}`);

    // Tampilkan form tetap terbuka
    registrationForm.style.display = 'block';
    successMessage.style.display = 'none';
  } finally {
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Back to form button
backToFormBtn.addEventListener('click', function () {
  successMessage.style.display = 'none';
  registrationForm.style.display = 'block';
  registrationForm.reset();
  clearErrors();

  // Scroll to form
  registrationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Fungsi fallback untuk mengirim email (optional)
function sendFallbackEmail(data) {
  // Ini hanya contoh, untuk implementasi nyata gunakan EmailJS
  const emailBody = `
Pendaftaran Baru Hiking Adventure:
Nama: ${data.nama_lengkap}
Email: ${data.email}
Telepon: ${data.telepon}
Usia: ${data.usia}
Pengalaman: ${data.pengalaman}
Paket: ${data.paket}
Kontak Darurat: ${data.kontak_darurat}
Info Kesehatan: ${data.info_kesehatan}
Waktu Pendaftaran: ${data.submitted_at}
  `;

  console.log('Fallback email content:', emailBody);
  // Untuk implementasi nyata, Anda bisa integrasi dengan EmailJS
}

// Form input validation on focus
const formInputs = registrationForm.querySelectorAll('input, select, textarea');
formInputs.forEach((input) => {
  input.addEventListener('focus', function () {
    this.style.borderColor = 'var(--secondary-color)';
  });

  input.addEventListener('blur', function () {
    if (!this.value && this.required) {
      this.style.borderColor = 'var(--error-color)';
    } else {
      this.style.borderColor = '#ddd';
    }
  });
});

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.info-card, .registration-section');

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Initial setup for animation
window.addEventListener('load', () => {
  const animatedElements = document.querySelectorAll('.info-card, .registration-section');
  animatedElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Trigger initial animation
  setTimeout(animateOnScroll, 100);
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
