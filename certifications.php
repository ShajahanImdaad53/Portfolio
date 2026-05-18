<?php include 'data.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><?php echo $profile['name']; ?> | Professional Certifications</title>
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
        <a href="index.html" class="nav-link">← Back to Portfolio</a>
        <a href="#all-certs" class="nav-link active">All Certificates</a>
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

  <!-- Certifications Hero Section -->
  <section class="certifications-hero" style="padding-top: 150px; padding-bottom: 50px; text-align: center;">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title" style="margin-bottom: 20px;">Professional Certifications</h1>
        <p class="hero-subtitle">Showcasing my expertise through industry-recognized credentials</p>
      </div>
    </div>
  </section>

  <!-- Certifications Detailed -->
  <section class="certifications-detailed" id="all-certs" style="padding: 50px 0;">
    <div class="container">
      <div class="certificates-grid">
        <?php
        $dir = 'Certificates/';
        if (is_dir($dir)) {
            $files = scandir($dir);
            $cert_files = array_filter($files, function($file) {
                return pathinfo($file, PATHINFO_EXTENSION) === 'pdf' || pathinfo($file, PATHINFO_EXTENSION) === 'jpg' || pathinfo($file, PATHINFO_EXTENSION) === 'png';
            });
            
            if (count($cert_files) > 0) {
                foreach ($cert_files as $file) {
                    $name = pathinfo($file, PATHINFO_FILENAME);
                    // Format name nicely
                    $name = str_replace(['_', '-'], ' ', $name);
                    $filepath = htmlspecialchars($dir . $file);
                    ?>
                    <div class="certificate-glass-card">
                        <div class="certificate-preview" style="width: 100%; height: 220px; overflow: hidden; border-radius: 10px; margin-bottom: 1rem; background: rgba(0,0,0,0.5);">
                            <?php if(strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf'): ?>
                                <iframe src="<?php echo $filepath; ?>#toolbar=0&navpanes=0&scrollbar=0&view=FitH" style="width: 100%; height: 100%; border: none;"></iframe>
                            <?php else: ?>
                                <img src="<?php echo $filepath; ?>" alt="<?php echo htmlspecialchars($name); ?>" style="width: 100%; height: 100%; object-fit: cover;" />
                            <?php endif; ?>
                        </div>
                        <div class="certificate-content">
                            <h4><?php echo htmlspecialchars($name); ?></h4>
                        </div>
                        <div class="certificate-action">
                            <a href="<?php echo $filepath; ?>" target="_blank" class="btn btn-primary btn-sm" style="display:inline-block; margin-top:10px;">
                                <i class="fas fa-external-link-alt"></i> View Certificate
                            </a>
                        </div>
                    </div>
                    <?php
                }
            } else {
                echo "<p>No certificates found in the folder.</p>";
            }
        } else {
             echo "<p>Certificates directory not found.</p>";
        }
        ?>
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
          <a href="index.html">Portfolio</a>
          <a href="certifications.html">Certifications</a>
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
