
function abrirLink(service) {
  const numero = "5585996139725";
  const texto = encodeURIComponent(`Olá! Tenho interesse no seu serviço de ${service}. Poderia me dar mais informações?`);
  window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
}

function msgTemplate(template) {
  const numero = "5585996139725";
  const texto = encodeURIComponent(`Olá! Tenho interesse no template de ${template}. Poderia me dar mais informações?`);
  window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
}

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
