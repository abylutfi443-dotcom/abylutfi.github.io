document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');

  // Fungsi untuk mengaktifkan/menonaktifkan menu navigasi
  menuToggle.addEventListener('click', function () {
    // Toggle class 'active' pada elemen nav
    nav.classList.toggle('active');

    // Mengubah atribut aria-expanded untuk aksesibilitas
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Menutup menu navigasi saat link diklik (berguna di mobile)
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
