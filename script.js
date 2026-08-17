/* =========================================================
   Roger — Portfolio  |  Vanilla JS Interactions
   - Mobile hamburger menu
   - Header scroll state
   - Active nav link on scroll (scrollspy)
   - Scroll reveal animations (Intersection Observer)
   - Service modal ("Saiba mais")
   - Footer year
   ========================================================= */

(function () {
  'use strict';

  /* ----- 1. Mobile menu toggle ----- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  function closeMenu() {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ----- 2. Header scroll state ----- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- 3. Scrollspy — active nav link ----- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((l) =>
            l.classList.toggle('active', l.getAttribute('href') === '#' + id)
          );
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spyObserver.observe(s));

  /* ----- 4. Scroll reveal animations ----- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for grouped elements
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ----- 5. Service modal ----- */
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');

  const serviceContent = {
    sites: {
      title: 'Criação de Sites',
      text: 'Desenvolvimento de sites e landing pages do zero, com design moderno, responsivo e otimizado para mecanismos de busca. Cada projeto é construído com código limpo e semântico, garantindo velocidade e fácil manutenção.',
    },
    automacoes: {
      title: 'Automações',
      text: 'Criação de scripts em Python para automatizar tarefas repetitivas, processar dados e integrar sistemas. Ganhe tempo e reduza erros manuais com soluções sob medida para o seu fluxo de trabalho.',
    },
    suporte: {
      title: 'Suporte Remoto',
      text: 'Manutenção, atualizações e correções rápidas no seu site ou ambiente de desenvolvimento. Atendimento remoto ágil para resolver problemas técnicos e manter tudo funcionando sem dor de cabeça.',
    },
  };

  function openModal(key) {
    const data = serviceContent[key];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-service]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.service));
  });

  modal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* ----- 6. Footer year ----- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
