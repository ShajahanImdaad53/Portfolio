// script.js — Premium Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Intro Animation (Solar System)
  // ==========================================
  const introScreen = document.getElementById('intro-screen');
  if (introScreen) {
    // Disable scrolling during intro
    document.body.style.overflow = 'hidden';
    
    const solarSystem = document.querySelector('.solar-system');
    const sunProfile = document.querySelector('.sun-profile');
    const skipBtn = document.getElementById('skip-intro-btn');
    let introEnded = false;

    const endIntro = () => {
      if (introEnded) return;
      introEnded = true;
      introScreen.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => {
        introScreen.remove();
      }, 400);
    };

    if (skipBtn) {
      skipBtn.addEventListener('click', endIntro);
    }
    
    // Timeline
    // 1. Orbit plays automatically via CSS (for 1.5 seconds)
    setTimeout(() => {
      if (introEnded) return;
      // 2. Converge (planets rush to center)
      solarSystem.classList.add('converge');
      
      setTimeout(() => {
        if (introEnded) return;
        // 3. Reveal profile photo (explosion)
        sunProfile.classList.add('revealed');
        
        setTimeout(() => {
          // 4. Fade out intro screen and enable scroll
          endIntro();
        }, 1000); // Time to show the profile photo before fading
        
      }, 500); // Time it takes for planets to converge
      
    }, 1500); // Time for the initial orbit phase
  }

  // ==========================================
  // 0. Light / Dark Mode Toggle
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Load saved preference
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.className = 'fas fa-sun';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .btn, .skill-pill, .glass-card, .project-link, .contact-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    });
  });

  // ==========================================
  // 2. Particle Background
  // ==========================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ==========================================
  // 3. Navigation: Active state + scroll effect
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // Active section tracking
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });

    // Navbar scroll effect
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Counter animation utility function
  function animateCounter(el, target, duration = 1500) {
    let startTimestamp = null;
    el.textContent = '0';
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target; // Ensure exact final value
      }
    };
    window.requestAnimationFrame(step);
  }

  // ==========================================
  // 4. Scroll Reveal (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');

      // Trigger counter animations when profile-card is revealed
      if (entry.target.classList.contains('profile-card')) {
        const certCountEl = document.getElementById('cert-count');
        if (certCountEl) {
          animateCounter(certCountEl, 23, 1500);
        }

        const repoCountEl = document.getElementById('repo-count');
        if (repoCountEl && window.targetRepoCount !== undefined) {
          animateCounter(repoCountEl, window.targetRepoCount, 1500);
        } else {
          window.shouldAnimateRepos = true;
        }
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 5. Smooth Scroll for nav links
  // ==========================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // 6. Role Cycler & Certifications Engine
  // ==========================================
  initHeroRoleCycler();
  initCertificationsEngine();

  // ==========================================
  // 7. Fetch GitHub Projects
  // ==========================================
  fetchGitHubProjects();
});
async function fetchGitHubProjects() {
  const container = document.getElementById('github-projects-container');
  const repoCountEl = document.getElementById('repo-count');
  const username = 'ShajahanImdaad53';

  let filteredRepos = [];

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repos');

    const repos = await response.json();
    filteredRepos = repos.filter(repo => !repo.fork && repo.name !== username);
  } catch (error) {
    console.warn('GitHub API rate limit exceeded or error, using fallback projects', error);
    filteredRepos = [
      { name: "online-complaint-box", description: "A digital complaint management system.", language: "JavaScript", html_url: "https://github.com/ShajahanImdaad53/online-complaint-box", homepage: "https://online-complaint-box.vercel.app" },
      { name: "predictive-analysis", description: "Predictive analysis models and scripts.", language: "Python", html_url: "https://github.com/ShajahanImdaad53/predictive-analysis", homepage: null },
      { name: "aI-powered-job-market-and-career-recommendation-System", description: "AI based career recommendations.", language: "JavaScript", html_url: "https://github.com/ShajahanImdaad53/aI-powered-job-market-and-career-recommendation-System", homepage: null },
      { name: "fh-electronicsmaruthamunai", description: "E-commerce store for electronics.", language: "CSS", html_url: "https://github.com/ShajahanImdaad53/fh-electronicsmaruthamunai", homepage: null },
      { name: "ECOMMERCE", description: "An eCommerce platform built with modern tech.", language: "TypeScript", html_url: "https://github.com/ShajahanImdaad53/ECOMMERCE", homepage: "https://ecommerce-zeta-nine-68.vercel.app" },
      { name: "SnakeGame", description: "Classic Snake Game in Python.", language: "Python", html_url: "https://github.com/ShajahanImdaad53/SnakeGame", homepage: null },
      { name: "Hospital-Management", description: "Hospital Management System.", language: "JavaScript", html_url: "https://github.com/ShajahanImdaad53/Hospital-Management", homepage: null },
      { name: "SignLanguage", description: "Sign Language detection.", language: "Python", html_url: "https://github.com/ShajahanImdaad53/SignLanguage", homepage: null },
      { name: "handloom-website", description: "A website for handloom products.", language: "HTML", html_url: "https://github.com/ShajahanImdaad53/handloom-website", homepage: null },
      { name: "Portfolio", description: "Personal Portfolio.", language: "CSS", html_url: "https://github.com/ShajahanImdaad53/Portfolio", homepage: null }
    ];
  }

    // Update repo count target
    window.targetRepoCount = filteredRepos.length;
    if (window.shouldAnimateRepos && repoCountEl) {
      animateCounter(repoCountEl, window.targetRepoCount, 1500);
    } else if (repoCountEl) {
      repoCountEl.textContent = '0'; // default starting state
    }

    container.innerHTML = '';

    filteredRepos.forEach((repo, index) => {
      // Determine icon
      let iconClass = 'fas fa-code';
      const lang = repo.language;
      if (lang === 'Python') iconClass = 'fab fa-python';
      else if (lang === 'HTML') iconClass = 'fab fa-html5';
      else if (lang === 'JavaScript') iconClass = 'fab fa-js';
      else if (lang === 'Java') iconClass = 'fab fa-java';
      else if (lang === 'PHP') iconClass = 'fab fa-php';
      else if (lang === 'CSS') iconClass = 'fab fa-css3-alt';
      else if (lang === 'TypeScript') iconClass = 'fab fa-js';
      else if (lang === 'Jupyter Notebook') iconClass = 'fas fa-book';

      // Custom LinkedIn links for specific projects
      let demoLink = repo.homepage || '';
      let demoIcon = 'fas fa-external-link-alt';
      let demoTitle = 'Live Demo';

      if (repo.name.toLowerCase().includes('snakegame')) {
        demoLink = 'https://www.linkedin.com/posts/imdaad-shajahan-75094229a_python-gamedevelopment-personalproject-activity-7393937615399469056-Bw6d';
        demoIcon = 'fab fa-linkedin';
        demoTitle = 'View on LinkedIn';
      } else if (repo.name.toLowerCase().includes('blinkit') || repo.name.toLowerCase().includes('powerbi') || repo.name.toLowerCase().includes('dashboard')) {
        demoLink = 'https://www.linkedin.com/posts/imdaad-shajahan-75094229a_powerbi-dataanalytics-datavisualization-activity-7375905973787602944-6ZnS';
        demoIcon = 'fab fa-linkedin';
        demoTitle = 'View on LinkedIn';
      }

      // Gradient backgrounds for variety
      const gradients = [
        'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        'linear-gradient(135deg, #172554 0%, #0c0a09 100%)',
        'linear-gradient(135deg, #1a2e05 0%, #0f172a 100%)',
        'linear-gradient(135deg, #4a1942 0%, #0f172a 100%)',
        'linear-gradient(135deg, #164e63 0%, #0f172a 100%)',
        'linear-gradient(135deg, #3b0764 0%, #0f172a 100%)',
      ];
      const gradient = gradients[index % gradients.length];

      // Custom AI Generated Thumbnails Mapping
      const thumbnailMap = {
        'SnakeGame': 'assets/thumbnails/snake_game_thumb.png',
        'Hospital-Management': 'assets/thumbnails/hospital_mgmt_thumb.png',
        'ECOMMERCE': 'assets/thumbnails/ecommerce_thumb.png',
        'SignLanguage': 'assets/thumbnails/sign_language_thumb.png',
        'handloom-website': 'assets/thumbnails/handloom_site_thumb.png',
        'AI-CHATBOT': 'assets/thumbnails/ai_chatbot_thumb.png',
        'chatbot': 'assets/thumbnails/ai_chatbot_thumb.png',
        'Portfolio': 'assets/thumbnails/portfolio_site_thumb.png',
        'fh-electronicsmaruthamunai': 'assets/thumbnails/fh_electronics_thumb.jpg',
        'aI-powered-job-market-and-career-recommendation-System': 'assets/thumbnails/ai_job_thumb.jpg',
        'AutoReply': 'assets/thumbnails/autoreply_thumb.jpg',
        'imdaadECW': 'assets/thumbnails/imdaad_ecw_thumb.jpg',
        'online-complaint-box': 'assets/thumbnails/online_complaint_box_thumb.jpg',
        'predictive-analysis': 'assets/thumbnails/predictive_analysis_thumb.jpg',
      };
      const thumbImage = thumbnailMap[repo.name] || null;

      const card = document.createElement('div');
      card.className = 'glass-card project-card reveal';

      card.innerHTML = `
        <div class="project-image" style="background: ${gradient};">
          ${thumbImage ? `<img src="${thumbImage}" alt="${repo.name} thumbnail" />` : `<i class="${iconClass}"></i>`}
          <div class="project-overlay">
            <div class="project-links">
              ${demoLink ? `<a href="${demoLink}" target="_blank" class="project-link" title="${demoTitle}"><i class="${demoIcon}"></i></a>` : ''}
              <a href="${repo.html_url}" target="_blank" class="project-link" title="Source Code">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
          <p class="project-description">${repo.description || 'A project built with passion by Imdaad.'}</p>
          <div class="project-tech">
            ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ''}
          </div>
        </div>
      `;

      container.appendChild(card);

      // Observe for scroll reveal with staggered delay
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active');
            }, (index % 3) * 100); // stagger within each row
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(card);

      // Attach cursor hover for dynamically created cards
      card.addEventListener('mouseenter', () => {
        document.getElementById('cursor-dot')?.classList.add('hovering');
        document.getElementById('cursor-ring')?.classList.add('hovering');
      });
      card.addEventListener('mouseleave', () => {
        document.getElementById('cursor-dot')?.classList.remove('hovering');
        document.getElementById('cursor-ring')?.classList.remove('hovering');
      });
    });

}

// ==========================================
// Math Animations
// ==========================================
function initMathAnimations() {
  const container = document.getElementById('math-background-container');
  if (!container) return;
  const symbols = ['Σ', 'μ', 'σ²', '∫', 'x̄', 'β', 'π', 'Δ', 'e=mc²', 'f(x)', '∞'];
  setInterval(() => {
    const particle = document.createElement('div');
    particle.className = 'math-particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.fontSize = Math.random() * 20 + 14 + 'px';
    particle.style.setProperty('--rotation', (Math.random() * 360) + 'deg');
    particle.style.setProperty('--max-opacity', (Math.random() * 0.3 + 0.1).toFixed(2));
    const duration = Math.random() * 10 + 10; // 10 to 20 seconds
    particle.style.animationDuration = duration + 's';
    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
  }, 800);
}
document.addEventListener('DOMContentLoaded', initMathAnimations);

// ==========================================
// Hero Dynamic Role Cycler
// ==========================================
function initHeroRoleCycler() {
  const el = document.getElementById('hero-role-text');
  if (!el) return;

  const roles = [
    "Data Scientist & ML Engineer",
    "Quantitative Analyst (Fin. Eng)",
    "Autonomous AI Agent Developer",
    "Computer Vision & Deep Learning"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 90;

  function typeRole() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 40;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      delay = 2400; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400; // Pause before typing new word
    }

    setTimeout(typeRole, delay);
  }

  typeRole();
}

// ==========================================
// Certifications Engine (Search, Filter, Modal)
// ==========================================
function initCertificationsEngine() {
  const container = document.getElementById('certs-container');
  const searchInput = document.getElementById('certs-search-input');
  const clearBtn = document.getElementById('clear-search-btn');
  const filterBtns = document.querySelectorAll('.certs-filter-tabs .filter-pill');
  const resultsCountEl = document.getElementById('certs-results-count');
  const modalBackdrop = document.getElementById('cert-modal-backdrop');
  const modalClose = document.getElementById('cert-modal-close');

  if (!container || !window.CERTIFICATIONS_DATA) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function renderCertificates() {
    const query = searchQuery.toLowerCase().trim();

    const filtered = window.CERTIFICATIONS_DATA.filter(cert => {
      const matchCat = (activeCategory === 'all') || (cert.category === activeCategory);
      const matchSearch = !query ||
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.skills.some(s => s.toLowerCase().includes(query)) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(query));
      return matchCat && matchSearch;
    });

    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${filtered.length} of ${window.CERTIFICATIONS_DATA.length} credentials`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem;">
          <i class="fas fa-search" style="font-size: 2.2rem; color: #818cf8; margin-bottom: 1rem; opacity: 0.6;"></i>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-primary);">No credentials matched your search</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">Try adjusting your keywords or clearing the category filter.</p>
          <button id="reset-search-btn" class="btn btn-secondary" style="margin-top: 1.25rem; font-size: 0.85rem; padding: 0.6rem 1.4rem;">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-search-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          if (clearBtn) clearBtn.style.display = 'none';
          filterBtns.forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
          renderCertificates();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(cert => {
      const skillsHtml = cert.skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join('');
      return `
        <div class="glass-card cert-card reveal active" style="--card-accent: ${cert.categoryBadgeColor || '#818cf8'};">
          <div class="cert-top-row">
            <div class="cert-icon-box">
              <i class="${cert.issuerIcon || 'fas fa-award'}"></i>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="cert-category-badge">${cert.categoryLabel}</span>
              <span class="cert-verified-pill" title="Verified Credential">
                <span class="verified-dot"></span>
              </span>
            </div>
          </div>
          <h3 class="cert-title">${cert.title}</h3>
          <p class="cert-issuer-meta">
            <i class="fas fa-certificate"></i> ${cert.issuer} &bull; ${cert.date}
          </p>
          <div class="cert-skills-pills">
            ${skillsHtml}
          </div>
          <div class="cert-card-actions">
            <button class="btn-inspect" data-cert-id="${cert.id}">
              <i class="fas fa-eye"></i> Quick Details
            </button>
            <a href="${cert.file}" target="_blank" class="btn-pdf-link" title="Open PDF in new tab">
              <i class="fas fa-file-pdf"></i> PDF
            </a>
          </div>
        </div>
      `;
    }).join('');

    // Attach inspect click handlers
    container.querySelectorAll('.btn-inspect').forEach(btn => {
      btn.addEventListener('click', () => {
        const certId = btn.dataset.certId;
        const cert = window.CERTIFICATIONS_DATA.find(c => c.id === certId);
        if (cert) openModal(cert);
      });
    });

    // Reattach hover effect to custom cursor
    container.querySelectorAll('.cert-card, .btn-inspect, .btn-pdf-link').forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.getElementById('cursor-dot')?.classList.add('hovering');
        document.getElementById('cursor-ring')?.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        document.getElementById('cursor-dot')?.classList.remove('hovering');
        document.getElementById('cursor-ring')?.classList.remove('hovering');
      });
    });
  }

  // Filter pills click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'all';
      renderCertificates();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = searchQuery ? 'block' : 'none';
      }
      renderCertificates();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      clearBtn.style.display = 'none';
      renderCertificates();
      searchInput.focus();
    });
  }

  // Modal logic
  function openModal(cert) {
    if (!modalBackdrop) return;
    const titleEl = document.getElementById('modal-cert-title');
    const issuerEl = document.getElementById('modal-cert-issuer');
    const catEl = document.getElementById('modal-cert-category');
    const sumEl = document.getElementById('modal-cert-summary');
    const skillsContainer = document.getElementById('modal-cert-skills');
    const verifyBtn = document.getElementById('modal-verify-link');
    const pdfBtn = document.getElementById('modal-pdf-link');

    if (titleEl) titleEl.textContent = cert.title;
    if (issuerEl) issuerEl.innerHTML = `<i class="${cert.issuerIcon || 'fas fa-award'}"></i> ${cert.issuer} &bull; ${cert.date}`;
    if (catEl) {
      catEl.textContent = cert.categoryLabel;
      catEl.style.borderColor = cert.categoryBadgeColor || '#818cf8';
      catEl.style.color = cert.categoryBadgeColor || '#818cf8';
    }
    if (sumEl) {
      sumEl.textContent = cert.summary || "Comprehensive competency verified through rigorous assessment and real-world project deliverables.";
    }

    if (skillsContainer) {
      skillsContainer.innerHTML = cert.skills.map(s => `<span class="tech-tag" style="background: rgba(129, 140, 248, 0.12); color: #fff;">${s}</span>`).join('');
    }

    if (verifyBtn) {
      if (cert.verifyUrl) {
        verifyBtn.href = cert.verifyUrl;
        verifyBtn.target = "_blank";
        verifyBtn.style.display = 'inline-flex';
        verifyBtn.innerHTML = `<i class="fas fa-shield-alt"></i> Verify Online`;
      } else if (cert.credentialId) {
        verifyBtn.removeAttribute('href');
        verifyBtn.removeAttribute('target');
        verifyBtn.style.display = 'inline-flex';
        verifyBtn.innerHTML = `<i class="fas fa-fingerprint"></i> ${cert.credentialId}`;
      } else {
        verifyBtn.style.display = 'none';
      }
    }

    if (pdfBtn) {
      pdfBtn.href = cert.file;
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Initial render
  renderCertificates();
}
