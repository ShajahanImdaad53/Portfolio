$content = Get-Content script.js -Raw
$newContent = $content -replace '(?s)  try \{.*?    const filteredRepos = repos\.filter\(repo => !repo\.fork && repo\.name !== username\);', '  let filteredRepos = [];

  try {
    const response = await fetch("https://api.github.com/users/$username/repos?sort=updated&per_page=100");
    if (!response.ok) throw new Error(''Failed to fetch repos'');

    const repos = await response.json();
    filteredRepos = repos.filter(repo => !repo.fork && repo.name !== username);
  } catch (error) {
    console.warn(''GitHub API rate limit exceeded, using fallback projects'');
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
  }'

$newContent = $newContent -replace '(?s)  \} catch \(error\) \{.*?      <\/div>\n    ;\n  \}\n\}', '}'
Set-Content script.js $newContent
