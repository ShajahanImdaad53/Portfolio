// Modern Portfolio JavaScript - Enhanced Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // ===== Navigation Menu Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      navToggle.classList.toggle('open');
    });
  }

  // ===== Theme Toggle =====
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'light') {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // ===== Smooth Scrolling for Navigation Links =====
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Close mobile menu
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');

        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Active Navigation Link on Scroll =====
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Initial call

  // ===== Typing Animation for Hero Subtitle =====
  const typingText = document.querySelector('.typing-text');
  const cursor = document.querySelector('.cursor');

  if (typingText && cursor) {
    const roles = [
      'Data Scientist',
      'Machine Learning Engineer',
      'Full Stack Developer',
      'AI Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next role
      }

      setTimeout(typeWriter, typingSpeed);
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
  }

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ===== Floating Cards Animation =====
  const floatingCards = document.querySelectorAll('.floating-card');

  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
  });

  // ===== Stats Counter Animation =====
  const stats = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        stats.forEach(stat => {
          const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
          animateCounter(stat, 0, target, 2000);
        });
      }
    });
  }, { threshold: 0.5 });

  if (stats.length > 0) {
    statsObserver.observe(stats[0].closest('.hero-stats'));
  }

  function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // ===== Project Cards Hover Effects =====
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = 'var(--shadow-hover)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'var(--shadow)';
    });
  });

  // ===== Skill Items Hover Effects =====
  const skillItems = document.querySelectorAll('.skill-item');

  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px) scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===== Contact Form Validation and Submission =====
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: 1rem;
      border-radius: 10px;
      margin-top: 1rem;
      font-weight: 500;
      text-align: center;
      ${type === 'success'
        ? 'background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2);'
        : 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2);'
      }
    `;

    contactForm.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  // ===== Back to Top Button =====
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== Scroll Indicator Animation =====
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Update scroll indicator opacity based on scroll position
      const opacity = Math.min(scrollPercent / 20, 1);
      scrollIndicator.style.opacity = 1 - opacity;
    });
  }

  // ===== Particle Background Effect =====
  function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)'};
        border-radius: 50%;
        opacity: ${Math.random() * 0.3 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 15 + 10}s linear infinite;
        pointer-events: none;
        z-index: 1;
      `;

      hero.appendChild(particle);
    }
  }

  // Add particle animation keyframes
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes float-particle {
      0% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.1;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleStyle);

  createParticles();

  // ===== Navbar Background on Scroll =====
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.98)';
      navbar.style.backdropFilter = 'blur(15px)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
  });

  // ===== Keyboard Navigation =====
  document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      navToggle.classList.remove('open');
    }
  });

  // ===== Performance Optimization =====
  let scrollTimeout;
  const throttledScroll = () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        updateActiveNavLink();
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  };

  window.addEventListener('scroll', throttledScroll);

  // ===== Loading Animation =====
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // ===== Image Lazy Loading =====
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ===== Accessibility Improvements =====
  // Add focus states for keyboard navigation
  const focusableElements = document.querySelectorAll('button, a, input, textarea, select');

  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--primary-color)';
      element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });

  // ===== Console Welcome Message =====
  console.log(`
  ╔══════════════════════════════════════════════════════════════╗
  ║                                                              ║
  ║                Welcome to Imdaad's Portfolio!                ║
  ║                                                              ║
  ║                Built with ❤️ using HTML, CSS & JS            ║
  ║                                                              ║
  ╚══════════════════════════════════════════════════════════════╝
  `);
});





