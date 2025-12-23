document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  alert(`Pesan terkirim:\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`);
  this.reset(); // Reset form after submission
});
