// script.js — Premium Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Custom Cursor
  // ==========================================
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

  // ==========================================
  // 4. Scroll Reveal (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
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
  // 6. Fetch GitHub Projects
  // ==========================================
  fetchGitHubProjects();
});


async function fetchGitHubProjects() {
  const container = document.getElementById('github-projects-container');
  const repoCountEl = document.getElementById('repo-count');
  const username = 'ShajahanImdaad53';

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
    if (!response.ok) throw new Error('Failed to fetch repos');

    const repos = await response.json();
    const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== username);

    // Update repo count in About section
    if (repoCountEl) repoCountEl.textContent = filteredRepos.length;

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

      const card = document.createElement('div');
      card.className = 'glass-card project-card reveal';

      card.innerHTML = `
        <div class="project-image" style="background: ${gradient};">
          <i class="${iconClass}"></i>
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

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    container.innerHTML = `
      <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ef4444; margin-bottom: 1rem; display: block;"></i>
        <p style="color: var(--text-secondary);">Failed to load projects. Please try again later.</p>
      </div>
    `;
  }
}
