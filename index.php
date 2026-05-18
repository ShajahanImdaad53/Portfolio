<?php include 'data.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><?php echo $profile['name']; ?> | <?php echo $profile['headline']; ?></title>
  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="theme.css"/>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <span><?php echo explode(' ', $profile['name'])[0]; ?></span>
      </div>
      <div class="nav-menu">
        <a href="#hero" class="nav-link active">Home</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#experience" class="nav-link">Experience</a>
        <a href="#education" class="nav-link">Education</a>
        <a href="certifications.php" class="nav-link">Certifications</a>
        <a href="achievements.php" class="nav-link">Achievements</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
      <div class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Theme">
        <i class="fas fa-moon"></i>
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="hero" class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Hi, I'm <span class="highlight"><?php echo $profile['name']; ?></span>
          </h1>
          <div class="hero-subtitle">
            <span class="typing-text"></span>
            <span class="cursor">|</span>
          </div>
          <p class="hero-description">
            <?php echo $profile['about']; ?>
          </p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number"><?php echo count($projects); ?>+</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat">
              <span class="stat-number"><?php echo count($certifications); ?>+</span>
              <span class="stat-label">Certifications</span>
            </div>
            <div class="stat">
              <span class="stat-number"><?php echo count($experience); ?>+</span>
              <span class="stat-label">Years Experience</span>
            </div>
          </div>
          <div class="hero-buttons">
            <a href="#projects" class="btn btn-primary">
              <i class="fas fa-eye"></i> View My Work
            </a>
            <a href="<?php echo $profile['linkedin']; ?>" target="_blank" class="btn btn-secondary">
              <i class="fab fa-linkedin"></i> LinkedIn Profile
            </a>
            <?php if (isset($profile['github'])): ?>
            <a href="<?php echo $profile['github']; ?>" target="_blank" class="btn btn-secondary" style="margin-top: 10px;">
              <i class="fab fa-github"></i> GitHub Profile
            </a>
            <?php endif; ?>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-container">
            <img src="<?php echo $profile['profile_image']; ?>" alt="<?php echo $profile['name']; ?>" class="profile-image" />
            <div class="image-overlay"></div>
          </div>
          <div class="floating-elements">
            <div class="floating-card card-1">
              <i class="fas fa-chart-line"></i>
              <span>Data Analysis</span>
            </div>
            <div class="floating-card card-2">
              <i class="fas fa-brain"></i>
              <span>Machine Learning</span>
            </div>
            <div class="floating-card card-3">
              <i class="fas fa-code"></i>
              <span>Python Expert</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="about">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">About Me</h2>
        <p class="section-subtitle">Get to know me better</p>
      </div>
      <div class="about-content">
        <div class="about-text">
          <h3>Passionate Data Scientist & ML Engineer</h3>
          <p><?php echo $profile['about']; ?></p>
          <div class="about-details">
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <span><?php echo $profile['location']; ?></span>
            </div>
            <div class="detail-item">
              <i class="fas fa-envelope"></i>
              <span><?php echo $profile['email']; ?></span>
            </div>
            <div class="detail-item">
              <i class="fas fa-phone"></i>
              <span><?php echo $profile['phone']; ?></span>
            </div>
          </div>
        </div>
        <div class="about-image">
          <img src="<?php echo $profile['profile_image']; ?>" alt="<?php echo $profile['name']; ?>" />
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="skills">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Skills & Expertise</h2>
        <p class="section-subtitle">Technologies I work with</p>
      </div>
      <div class="skills-grid">
        <?php foreach ($skills as $skill): ?>
        <div class="skill-item">
          <span class="skill-name"><?php echo $skill; ?></span>
          <div class="skill-bar">
            <div class="skill-progress" style="width: 85%"></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="projects">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-subtitle">My recent work and achievements</p>
      </div>
        <?php foreach ($projects as $project): ?>
        <div class="project-card">
          <div class="project-image">
            <img src="<?php echo isset($project['image']) ? $project['image'] : 'project-placeholder.jpg'; ?>" alt="<?php echo $project['title']; ?>" />
            <div class="project-overlay">
              <div class="project-links">
                <?php if (isset($project['demo'])): ?>
                <a href="<?php echo $project['demo']; ?>" target="_blank" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                </a>
                <?php endif; ?>
                <?php if (isset($project['github'])): ?>
                <a href="<?php echo $project['github']; ?>" target="_blank" class="project-link">
                  <i class="fab fa-github"></i>
                </a>
                <?php endif; ?>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title"><?php echo $project['title']; ?></h3>
            <p class="project-description"><?php echo $project['description']; ?></p>
            <div class="project-tech">
              <?php foreach ($project['technologies'] as $tech): ?>
              <span class="tech-tag"><?php echo $tech; ?></span>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
    </div>
  </section>

  <!-- Experience Section -->
  <section id="experience" class="experience">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Professional Experience</h2>
        <p class="section-subtitle">My professional journey</p>
      </div>

      <div class="experience-cards">
          <div class="cards-container">
            <?php foreach ($experience as $index => $exp): ?>
            <div class="experience-card" style="background-image: url('bg<?php echo ($index % 2) + 1; ?>.png');">
              <div class="card-overlay"></div>
              <div class="card-content">
                <div class="card-header">
                  <div class="card-icon">
                    <i class="fas fa-building"></i>
                  </div>
                  <div class="card-meta">
                    <span class="card-duration"><?php echo $exp['duration']; ?></span>
                    <span class="card-location"><?php echo $exp['location']; ?></span>
                  </div>
                </div>
                <h4 class="card-title"><?php echo $exp['title']; ?></h4>
                <p class="card-company"><?php echo $exp['company']; ?></p>
                <p class="card-description"><?php echo $exp['description']; ?></p>
                <div class="card-progress">
                  <div class="progress-bar" style="width: <?php echo (100 - $index * 10); ?>%"></div>
                </div>
              </div>
              <div class="card-hover-effect"></div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Education Section -->
  <section id="education" class="education" style="margin-top: 4rem;">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Education</h2>
        <p class="section-subtitle">My academic background</p>
      </div>

      <div class="education-cards">
          <div class="cards-container">
            <?php foreach ($education as $index => $edu): ?>
            <div class="education-card" style="background-image: url('bg<?php echo (($index + 1) % 2) + 1; ?>.png');">
              <div class="card-overlay"></div>
              <div class="card-content">
                <div class="card-header">
                  <div class="card-icon">
                    <i class="fas fa-university"></i>
                  </div>
                  <div class="card-meta">
                    <span class="card-year"><?php echo $edu['year']; ?></span>
                  </div>
                </div>
                <h4 class="card-title"><?php echo $edu['degree']; ?></h4>
                <p class="card-school"><?php echo $edu['school']; ?></p>
                <p class="card-description"><?php echo $edu['description']; ?></p>
                <div class="card-achievement">
                  <i class="fas fa-award"></i>
                  <span>Completed with Excellence</span>
                </div>
              </div>
              <div class="card-hover-effect"></div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>

      <!-- Certifications & Achievements Preview -->
      <div class="certifications-preview">
        <div class="preview-header">
          <h3>Professional Credentials</h3>
        </div>
        <div class="preview-stats">
          <div class="preview-stat">
            <div class="stat-number"><?php echo count($certifications); ?>+</div>
            <div class="stat-label">Certifications</div>
          </div>
          <div class="preview-stat">
            <div class="stat-number"><?php echo count($achievements); ?>+</div>
            <div class="stat-label">Achievements</div>
          </div>
          <div class="preview-stat">
            <div class="stat-number">5</div>
            <div class="stat-label">Categories</div>
          </div>
        </div>
        <div class="preview-actions">
          <a href="certifications.php" class="view-all-btn">
            <span>View Certifications</span>
            <i class="fas fa-certificate"></i>
          </a>
          <a href="achievements.php" class="view-all-btn secondary">
            <span>View Achievements</span>
            <i class="fas fa-trophy"></i>
          </a>
        </div>
        <div class="preview-categories">
          <div class="category-preview">
            <i class="fas fa-cloud"></i>
            <span>Cloud & DevOps (<?php echo count(array_filter($certifications, function($c) { return $c['category'] === 'cloud' || $c['category'] === 'devops'; })); ?>)</span>
          </div>
          <div class="category-preview">
            <i class="fas fa-brain"></i>
            <span>Data Science & AI (<?php echo count(array_filter($certifications, function($c) { return $c['category'] === 'data'; })); ?>)</span>
          </div>
          <div class="category-preview">
            <i class="fas fa-code"></i>
            <span>Programming & Tools (<?php echo count(array_filter($achievements, function($a) { return $a['category'] === 'programming'; })); ?>)</span>
          </div>
          <div class="category-preview">
            <i class="fas fa-shield-alt"></i>
            <span>Security & Management (<?php echo count(array_filter($certifications, function($c) { return $c['category'] === 'security'; })) + count(array_filter($achievements, function($a) { return $a['category'] === 'management'; })); ?>)</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LinkedIn Posts Section -->
  <section id="linkedin-posts" class="linkedin-posts">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Latest LinkedIn Posts</h2>
        <p class="section-subtitle">Stay updated with my professional insights</p>
      </div>
      <div class="posts-grid">
        <?php foreach ($linkedin_posts as $post): ?>
        <div class="post-card">
          <i class="fab fa-linkedin"></i>
          <p>Check out my latest post on LinkedIn</p>
          <a href="<?php echo $post; ?>" target="_blank" class="btn btn-primary">View Post</a>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Get In Touch</h2>
        <p class="section-subtitle">Let's work together</p>
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-card">
            <i class="fas fa-envelope"></i>
            <h3>Email</h3>
            <p><?php echo $profile['email']; ?></p>
          </div>
          <div class="contact-card">
            <i class="fab fa-linkedin"></i>
            <h3>LinkedIn</h3>
            <a href="<?php echo $profile['linkedin']; ?>" target="_blank">Connect with me</a>
          </div>
          <div class="contact-card">
            <i class="fab fa-whatsapp"></i>
            <h3>WhatsApp</h3>
            <a href="<?php echo $profile['whatsapp']; ?>" target="_blank">Chat with me</a>
          </div>
          <div class="contact-card">
            <i class="fas fa-phone"></i>
            <h3>Phone</h3>
            <p><?php echo $profile['phone']; ?></p>
          </div>
        </div>
        <div class="contact-form">
          <form action="contact.php" method="post">
            <div class="form-group">
              <input type="text" name="name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
              <input type="email" name="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
              <textarea name="message" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <span><?php echo explode(' ', $profile['name'])[0]; ?></span>
        </div>
        <div class="footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div class="footer-social">
          <a href="<?php echo $profile['linkedin']; ?>" target="_blank"><i class="fab fa-linkedin"></i></a>
          <?php if (isset($profile['github'])): ?>
          <a href="<?php echo $profile['github']; ?>" target="_blank"><i class="fab fa-github"></i></a>
          <?php endif; ?>
          <?php if (isset($profile['whatsapp'])): ?>
          <a href="<?php echo $profile['whatsapp']; ?>" target="_blank"><i class="fab fa-whatsapp"></i></a>
          <?php endif; ?>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <?php echo date('Y'); ?> <?php echo $profile['name']; ?>. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>