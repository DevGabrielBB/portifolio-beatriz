/**
 * Beatriz Bellacosa — Portfolio JavaScript
 * Funcionalidades: navbar scroll, menu mobile, scroll reveal, logo animation
 */

/* ============================================================
   1. NAVBAR — adiciona classe .scrolled ao fazer scroll
   ============================================================ */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // estado inicial
})();


/* ============================================================
   2. MENU MOBILE — hamburger toggle
   ============================================================ */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Fecha ao clicar em qualquer link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha ao clicar fora do menu
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
})();


/* ============================================================
   3. SCROLL REVEAL — anima elementos ao entrar na viewport
   ============================================================ */
(function () {
  // Seletores que receberão a animação de reveal
  const revealSelectors = [
    '.section-label',
    '.section-title',
    '.sobre-text p',
    '.stat-card',
    '.service-card',
    '.timeline-item',
    '.cert-card',
    '.contact-text p',
    '.btn-whatsapp',
  ];

  // Adiciona classe .reveal nos elementos
  revealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.classList.add('reveal');
    });
  });

  // Observer com stagger para cards irmãos
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Calcula delay com base na posição entre irmãos revelados juntos
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
        );
        const idx   = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 90, 450);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();


/* ============================================================
   4. SMOOTH SCROLL — links de navegação âncora
   ============================================================ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const navbarH = document.getElementById('navbar')?.offsetHeight || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   5. LOGO — parallax leve ao mover o mouse (desktop only)
   ============================================================ */
(function () {
  const logoCard = document.querySelector('.logo-card');
  if (!logoCard || window.matchMedia('(max-width: 960px)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    // Deslocamento máximo de ±12px
    const x = ((e.clientX / innerWidth)  - 0.5) * 24;
    const y = ((e.clientY / innerHeight) - 0.5) * 16;

    logoCard.style.transform = `translate(${x}px, ${y}px)`;
    logoCard.style.transition = 'transform 0.6s ease';
  });

  // Volta ao centro quando o mouse sai da janela
  document.addEventListener('mouseleave', () => {
    logoCard.style.transform = 'translate(0, 0)';
  });
})();


/* ============================================================
   6. WHATSAPP — tracking de clique (extensível)
   ============================================================ */
(function () {
  const waBtn = document.querySelector('.btn-whatsapp');
  if (!waBtn) return;

  waBtn.addEventListener('click', () => {
    // Ponto para integrar analytics futuramente
    console.info('[Portfolio] Clique no botão WhatsApp');
  });
})();
