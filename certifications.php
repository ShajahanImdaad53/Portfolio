<?php include 'data.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><?php echo $profile['name']; ?> | Professional Certifications</title>
  <link rel="stylesheet" href="style.css"/>
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
        <a href="index.php" class="nav-link">← Back to Portfolio</a>
        <a href="#cloud" class="nav-link">Cloud</a>
        <a href="#data" class="nav-link">Data & AI</a>
        <a href="#security" class="nav-link">Security</a>
        <a href="#devops" class="nav-link">DevOps</a>
      </div>
      <div class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
      <div class="nav-menu">
        <a href="index.php#hero" class="nav-link">Home</a>
        <a href="index.php#about" class="nav-link">About</a>
        <a href="index.php#experience" class="nav-link">Experience</a>
        <a href="index.php#projects" class="nav-link">Projects</a>
        <a href="certifications.php" class="nav-link active">Certifications</a>
        <a href="index.php#contact" class="nav-link">Contact</a>
      </div>
      <div class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>

  <!-- Certifications Hero Section -->
  <section class="certifications-hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Professional Certifications</h1>
        <p class="hero-subtitle">23+ Industry-recognized credentials showcasing expertise across cloud, data science, and technology domains</p>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">23+</div>
            <div class="stat-label">Certifications</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5</div>
            <div class="stat-label">Cloud Platforms</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">8</div>
            <div class="stat-label">Specializations</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Certifications Detailed -->
  <section class="certifications-detailed">
    <div class="container">
      <?php
      $categories = [
        'cloud' => ['name' => 'Cloud & DevOps', 'icon' => 'fas fa-cloud', 'color' => 'cloud'],
        'data' => ['name' => 'Data Science & AI', 'icon' => 'fas fa-brain', 'color' => 'data'],
        'devops' => ['name' => 'DevOps & Tools', 'icon' => 'fas fa-cogs', 'color' => 'devops'],
        'security' => ['name' => 'Security', 'icon' => 'fas fa-shield-alt', 'color' => 'security']
      ];

      foreach ($categories as $categoryKey => $categoryInfo) {
        $categoryCerts = array_filter($certifications, function($cert) use ($categoryKey) {
          return $cert['category'] === $categoryKey;
        });
        if (empty($categoryCerts)) continue;
      ?>
      <div class="certification-category" id="<?php echo $categoryKey; ?>">
        <div class="category-header">
          <i class="<?php echo $categoryInfo['icon']; ?>"></i>
          <h3><?php echo $categoryInfo['name']; ?></h3>
          <div class="category-count">
            <?php echo count($categoryCerts); ?> Certifications
          </div>
        </div>
        <div class="certificates-grid">
          <?php foreach ($categoryCerts as $certification): ?>
          <div class="certificate-glass-card">
            <div class="certificate-icon">
              <i class="<?php echo $categoryInfo['icon']; ?>"></i>
            </div>
            <div class="certificate-content">
              <h4><?php echo $certification['name']; ?></h4>
              <div class="certificate-provider">
                <span class="provider <?php echo $certification['provider']; ?>">
                  <?php echo ucfirst($certification['provider']); ?>
                </span>
              </div>
            </div>
            <div class="certificate-status">
              <span class="status-badge <?php echo $certification['status']; ?>">
                <?php echo ucfirst($certification['status']); ?>
              </span>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
      <?php } ?>
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
          <a href="index.php">Portfolio</a>
          <a href="certifications.php">Certifications</a>
          <a href="achievements.php">Achievements</a>
        </div>
        <div class="footer-social">
          <a href="<?php echo $profile['linkedin']; ?>" target="_blank"><i class="fab fa-linkedin"></i></a>
          <?php if (isset($profile['github'])): ?>
          <a href="<?php echo $profile['github']; ?>" target="_blank"><i class="fab fa-github"></i></a>
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