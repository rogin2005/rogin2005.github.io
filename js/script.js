
const btnMobile = document.querySelector('.btn-mobile');
const navLinks = document.querySelector('.nav-links');

btnMobile.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
