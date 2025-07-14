// script.js

// ===== Menu Toggle =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuToggle.classList.toggle('open'); // animate the hamburger
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    window.scrollTo({
      top: target.offsetTop - 60, // offset for fixed header
      behavior: 'smooth'
    });
  });
});

// ===== Scroll Reveal using IntersectionObserver =====
const revealElems = document.querySelectorAll('.reveal');
const observerOpts = {
  threshold: 0.1
};
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);
revealElems.forEach(el => {
  el.classList.add('hidden');
  revealObserver.observe(el);
});

// ===== Typing Effect =====
const typingElems = document.querySelectorAll('.typing');
typingElems.forEach(el => {
  const text = el.textContent.trim();
  el.textContent = '';
  let idx = 0;
  const speed = 100; // ms per char
  const type = () => {
    if (idx < text.length) {
      el.textContent += text[idx++];
      setTimeout(type, speed);
    }
  };
  setTimeout(type, 500); // delay before start
});

// ===== Animated Skill Bars =====
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const barInner = entry.target.querySelector('.skill-bar-fill');
      const level = barInner.getAttribute('data-level');
      barInner.style.width = level;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// ===== Back-to-Top Button =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
