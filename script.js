// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Navigation active state on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
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
  });

  // Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // Fetch GitHub Projects
  fetchGitHubProjects();
});

async function fetchGitHubProjects() {
  const container = document.getElementById('github-projects-container');
  const username = 'ShajahanImdaad53';
  
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    
    const repos = await response.json();
    container.innerHTML = ''; // Clear loading spinner
    
    // Filter out forks or profile readme if desired
    const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== username);
    
    filteredRepos.forEach(repo => {
      // Determine icon
      let iconClass = 'fas fa-code';
      if (repo.language === 'Python') iconClass = 'fab fa-python';
      else if (repo.language === 'HTML') iconClass = 'fab fa-html5';
      else if (repo.language === 'JavaScript') iconClass = 'fab fa-js';
      else if (repo.language === 'Java') iconClass = 'fab fa-java';
      else if (repo.language === 'PHP') iconClass = 'fab fa-php';
      
      let demoLink = repo.homepage || '';
      let demoIcon = 'fas fa-external-link-alt';
      let demoTitle = 'Live Demo';
      
      // Custom LinkedIn links
      if (repo.name.toLowerCase().includes('snakegame')) {
        demoLink = 'https://www.linkedin.com/posts/imdaad-shajahan-75094229a_python-gamedevelopment-personalproject-activity-7393937615399469056-Bw6d';
        demoIcon = 'fab fa-linkedin';
        demoTitle = 'View on LinkedIn';
      } else if (repo.name.toLowerCase().includes('blinkit') || repo.name.toLowerCase().includes('powerbi') || repo.name.toLowerCase().includes('dashboard')) {
        demoLink = 'https://www.linkedin.com/posts/imdaad-shajahan-75094229a_powerbi-dataanalytics-datavisualization-activity-7375905973787602944-6ZnS';
        demoIcon = 'fab fa-linkedin';
        demoTitle = 'View on LinkedIn';
      }
      
      // Build Card
      const card = document.createElement('div');
      card.className = 'glass-card project-card reveal';
      
      card.innerHTML = `
        <div class="project-image">
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
          <p class="project-description">${repo.description || 'A cool project built by Imdaad.'}</p>
          <div class="project-tech">
            ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ''}
          </div>
        </div>
      `;
      
      container.appendChild(card);
      // Observe the newly added card
      const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      revealOnScroll.observe(card);
    });
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    container.innerHTML = `
      <div class="glass-card" style="grid-column: 1 / -1; text-align: center; color: #ef4444;">
        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
        <p>Failed to load projects. Please try again later.</p>
      </div>
    `;
  }
}
