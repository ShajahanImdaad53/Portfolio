<?php include 'data.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><?php echo $profile['name']; ?> | Professional Achievements</title>
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
        <a href="#data" class="nav-link">Data Science</a>
        <a href="#programming" class="nav-link">Programming</a>
        <a href="#business" class="nav-link">Business</a>
        <a href="#management" class="nav-link">Management</a>
      </div>
      <div class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>

  <!-- Achievements Hero -->
  <section class="achievements-hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Professional Achievements</h1>
        <p class="hero-subtitle">Showcasing completed courses, specializations, and professional development milestones</p>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number"><?php echo count($achievements); ?>+</div>
            <div class="stat-label">Achievements</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5</div>
            <div class="stat-label">Categories</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Completed</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Achievements Detailed -->
  <section class="achievements-detailed">
    <div class="container">
      <?php
      $categories = [
        'data' => ['name' => 'Data Science & Analytics', 'icon' => 'fas fa-brain', 'color' => 'data'],
        'programming' => ['name' => 'Programming & Development', 'icon' => 'fas fa-code', 'color' => 'programming'],
        'business' => ['name' => 'Business Intelligence', 'icon' => 'fas fa-chart-line', 'color' => 'business'],
        'management' => ['name' => 'Project Management', 'icon' => 'fas fa-tasks', 'color' => 'management']
      ];

      foreach ($categories as $categoryKey => $categoryInfo) {
        $categoryAchievements = array_filter($achievements, function($achievement) use ($categoryKey) {
          return $achievement['category'] === $categoryKey;
        });
        if (empty($categoryAchievements)) continue;
      ?>
      <div class="achievement-category" id="<?php echo $categoryKey; ?>">
        <div class="category-header">
          <i class="<?php echo $categoryInfo['icon']; ?>"></i>
          <h3><?php echo $categoryInfo['name']; ?></h3>
          <div class="category-count">
            <?php echo count($categoryAchievements); ?> Achievements
          </div>
        </div>
        <div class="achievements-grid">
          <?php foreach ($categoryAchievements as $achievement): ?>
          <div class="achievement-card">
            <div class="achievement-icon">
              <i class="<?php echo $categoryInfo['icon']; ?>"></i>
            </div>
            <div class="achievement-content">
              <h4><?php echo $achievement['name']; ?></h4>
              <div class="achievement-provider">
                <span class="provider <?php echo $achievement['provider']; ?>">
                  <?php echo ucfirst($achievement['provider']); ?>
                </span>
              </div>
            </div>
            <div class="achievement-status">
              <span class="status-badge <?php echo $achievement['status']; ?>">
                <?php echo ucfirst($achievement['status']); ?>
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
        <div class="footer-section">
          <h4><?php echo $profile['name']; ?></h4>
          <p><?php echo $profile['headline']; ?></p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <div class="footer-links">
            <a href="index.php">Portfolio</a>
            <a href="certifications.php">Certifications</a>
            <a href="achievements.php">Achievements</a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Connect</h4>
          <div class="social-links">
            <a href="<?php echo $profile['linkedin']; ?>" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="<?php echo $profile['github']; ?>" target="_blank"><i class="fab fa-github"></i></a>
            <a href="mailto:<?php echo $profile['email']; ?>"><i class="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 <?php echo $profile['name']; ?>. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>