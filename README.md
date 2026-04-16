# Imdaad Shajahan - Data Scientist Portfolio

A modern, dynamic portfolio website built with PHP, HTML, CSS, and JavaScript, featuring LinkedIn integration.

## ✨ **Latest Updates**

### 🎨 **Experience & Education Section Redesign**
- **Unique Card-Based Layout**: Replaced simple timeline with modern animated cards
- **iOS Glassmorphism Design**: Liquid glass effect with blur, transparency, and frosted glass appearance
- **Background Images**: Each card uses `bg1.png` and `bg2.png` as dynamic backgrounds with glass overlay
- **Advanced Animations**: 
  - 3D hover transforms with enhanced glass effects
  - Subtle shimmer animations on glass surfaces
  - Smooth backdrop-filter transitions
  - Glass-like shadows and highlights
- **Professional Elements**:
  - Frosted glass icons and meta information
  - Gradient text effects on glass backgrounds
  - Achievement badges with glass styling
  - Progress bars with glassmorphism effects

### 🏆 **Certifications Showcase**
- **23 Professional Certifications**: Complete list from LinkedIn including:
  - AWS, Google Cloud, Microsoft Azure certifications
  - Data Science and Machine Learning specializations
  - Programming and development credentials
  - DevOps and security certifications
- **Categorized Display**: Organized by Cloud & DevOps, Data Science & ML, Programming & Tools, Security & Other
- **Statistics Dashboard**: Shows 23+ certifications, 5 cloud platforms, 8 specializations
- **Interactive Cards**: Hover effects and verified badges for each certification

### 🎯 **Enhanced Features**
- **Background Integration**: All sections now use semi-transparent backgrounds with your custom images
- **Responsive Design**: Optimized for all device sizes
- **Performance Optimized**: Smooth animations and efficient CSS

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Modern CSS with CSS Grid & Flexbox)
- JavaScript (ES6+)
- Font Awesome Icons

### Backend
- PHP 7.4+
- Mail functionality for contact form

### Key Features
- Intersection Observer API for scroll animations
- CSS Custom Properties (CSS Variables)
- Modern CSS Grid and Flexbox layouts
- Smooth scrolling navigation
- Particle background effects
- Typing animation effects
- Mobile-first responsive design
- Dynamic content loading from PHP arrays

## 📁 Project Structure

```
portfolio/
├── index.php           # Main PHP portfolio page
├── data.php            # Profile data and LinkedIn information
├── contact.php         # Contact form handler
├── style.css           # Modern CSS styles
├── script.js           # Interactive JavaScript
├── git.jpg            # Profile image (placeholder)
├── Imdaad CV.pdf      # Resume/CV download
└── README.md          # This file
```

## 🎯 Sections

1. **Hero Section**: Introduction with profile photo and key information
2. **About**: Personal background, education, and statistics
3. **Skills**: Technical skills organized by category
4. **Projects**: Featured projects with descriptions and technologies
5. **Experience**: Work experience timeline
6. **Certifications**: Professional certifications and achievements
7. **LinkedIn Posts**: Recent LinkedIn posts and updates
8. **Contact**: Contact information and functional form

## ⚙️ Setup Instructions

### Prerequisites
- PHP 7.4 or higher
- Web server (Apache, Nginx) or local development server

### Installation

1. **Update Profile Data**:
   - Open `data.php` in a text editor
   - Visit your LinkedIn profile: https://www.linkedin.com/in/imdaad-shajahan-75094229a
   - Copy your information to replace placeholders:
     - Profile image URL
     - About section
     - Work experience
     - Education
     - Skills
     - Projects
     - Certifications
     - Recent post links

2. **Configure Contact Form**:
   - Ensure PHP mail function is enabled on your server
   - Update email settings in `contact.php` if needed

3. **Add Project Images**:
   - Visit your LinkedIn profile projects section
   - Right-click on project images and copy image URLs
   - Replace the placeholder image URLs in `data.php` for each project
   - Example: `'image' => 'https://media.licdn.com/dms/image/C4E22AQF...'`

4. **Background Images**:
   - The website now uses `bg1.png` as a transparent background overlay throughout all sections
   - Reduced opacity to 60% for better background visibility
   - All sections (hero, about, skills, projects, experience, contact, footer) have semi-transparent backgrounds

5. **Timeline Design**:
   - Circular timeline markers have been changed to square shapes
   - Removed pulsing animation from timeline markers

### Running the Portfolio

- **Local Development**:
  ```bash
  php -S localhost:8000
  ```
  Visit `http://localhost:8000/index.php`

- **Web Server**: Upload files to your hosting provider with PHP support.

## 🔄 Updating Content

### From LinkedIn
1. Visit https://www.linkedin.com/in/imdaad-shajahan-75094229a
2. Copy information to `data.php` arrays
3. Update profile image URL
4. Add recent post links

### Adding Projects
Add to `$projects` array in `data.php`:

```php
[
    'title' => 'Project Title',
    'description' => 'Description...',
    'technologies' => ['Tech1', 'Tech2'],
    'github' => 'https://github.com/...',
    'demo' => 'https://demo-link.com'
]
```

## 📞 Contact

Imdaad Shajahan
- LinkedIn: https://www.linkedin.com/in/imdaad-shajahan-75094229a
- Email: [Update in data.php]

---

*Built with ❤️ using PHP, HTML, CSS & JS*

## 🚀 Getting Started

1. Clone or download the repository
2. Open `index.html` in your web browser
3. For local development with live server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Customization

### Colors
The design uses CSS custom properties (variables) for easy customization:
- Primary: Indigo (#6366f1)
- Secondary: Purple (#8b5cf6)
- Accent: Amber (#f59e0b)

### Content
Update the following sections in `index.html`:
- Personal information in the hero section
- Skills in the skills section
- Projects in the projects section
- Contact information

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Imdaad Shajahan**
- Email: shajahanimdaad20@gmail.com
- Phone: +94 754 738 475
- Location: Colombo, Sri Lanka

---

*Built with ❤️ using modern web technologies*
