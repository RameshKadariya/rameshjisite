# Ramesh Kadariya - Portfolio

A modern, animated portfolio website showcasing mobile apps, web extensions, and AR filters.

## 🚀 Features

### Visual Effects
- **Particle Background**: Interactive particle system that responds to mouse movement
- **3D Card Tilt**: Cards tilt in 3D space on hover
- **Magnetic Buttons**: Buttons follow cursor with magnetic effect
- **Smooth Animations**: GSAP-inspired animations throughout
- **Custom Cursor**: Animated cursor with follower effect
- **Glassmorphism**: Modern frosted glass design elements

### Animations
- **Loading Screen**: Animated logo reveal on page load
- **Typing Effect**: Auto-typing text for roles/titles
- **Counter Animation**: Numbers count up when scrolled into view
- **Scroll Animations**: Elements fade in as you scroll
- **Floating Cards**: Subtle floating animation on hero cards
- **Skill Bars**: Animated progress bars

### Interactive Features
- **Dark/Light Mode**: Toggle between themes
- **Project Filters**: Filter projects by category (Mobile, Web, AR)
- **Smooth Scroll**: Smooth scrolling between sections
- **Scroll Progress**: Visual indicator of page scroll progress
- **Mobile Menu**: Responsive hamburger menu
- **Contact Form**: Animated form with validation

### Performance
- **Optimized Animations**: 60fps smooth animations
- **Lazy Loading**: Images load as needed
- **Minimal Dependencies**: Pure vanilla JavaScript
- **Fast Load Time**: Optimized for speed

## 📁 Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   ├── main.css       # Core styles
│   └── animations.css # Animation keyframes
├── js/
│   ├── main.js        # Main functionality
│   ├── animations.js  # Animation controllers
│   └── particles.js   # Particle system
└── README.md          # This file
```

## 🎨 Customization

### Colors
Edit CSS variables in `css/main.css`:
```css
:root {
    --primary: #6366f1;      /* Primary color */
    --secondary: #8b5cf6;    /* Secondary color */
    --accent: #ec4899;       /* Accent color */
    --bg: #0f0f1e;          /* Background */
    --text: #ffffff;         /* Text color */
}
```

### Content
- Update personal info in `index.html`
- Add your project links
- Replace placeholder email/phone
- Add your social media links

### Projects
Add new projects in the projects section:
```html
<div class="project-card mobile" data-tilt>
    <!-- Your project content -->
</div>
```

## 🌟 Special Features

### Easter Egg
Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A

### Theme Toggle
Click the sun/moon icon in navigation to switch themes

### Magnetic Effect
Hover over buttons to see the magnetic attraction effect

## 📱 Responsive Design
- Desktop: Full experience with all animations
- Tablet: Optimized layout
- Mobile: Touch-friendly with simplified animations

## 🔧 Technologies Used
- HTML5 (Semantic markup)
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Canvas API (Particle system)
- Intersection Observer API (Scroll animations)

## 🚀 Deployment

### Option 1: GitHub Pages
1. Push to GitHub
2. Go to Settings > Pages
3. Select main branch
4. Your site will be live at `username.github.io/repo-name`

### Option 2: Netlify
1. Drag and drop the folder to Netlify
2. Instant deployment

### Option 3: Vercel
1. Import from GitHub
2. Deploy with one click

## 📝 To-Do (Optional Enhancements)
- [ ] Add PHP backend for contact form
- [ ] Integrate with email service (SendGrid, EmailJS)
- [ ] Add blog section
- [ ] Add testimonials slider
- [ ] Add project case studies
- [ ] Add resume download
- [ ] Add analytics (Google Analytics)
- [ ] Add SEO meta tags
- [ ] Add Open Graph tags for social sharing

## 🎯 Performance Tips
- Compress images before adding
- Use WebP format for images
- Minify CSS/JS for production
- Enable caching on server
- Use CDN for assets

## 📧 Contact Form Setup

To make the contact form functional, you have two options:

### Option 1: EmailJS (Easiest)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Add this script before closing `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```
3. Update form submission in `js/main.js`

### Option 2: PHP Backend
Create `php/contact.php`:
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $to = "your-email@example.com";
    $headers = "From: " . $email;
    
    mail($to, $subject, $message, $headers);
    echo json_encode(['success' => true]);
}
?>
```

## 🎨 Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📄 License
Free to use for personal projects. Please credit if you use the design.

## 🙏 Credits
- Fonts: Google Fonts (Poppins, Space Grotesk)
- Icons: Emoji (native)
- Inspiration: Modern web design trends 2025

## 💡 Tips
- Test on multiple devices
- Optimize images for web
- Keep content updated
- Add your real contact info
- Link to your actual projects
- Update meta tags for SEO

---

Built with ❤️ by Ramesh Kadariya
