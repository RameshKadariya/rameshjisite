// Main JavaScript functionality

class Portfolio {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupLoading();
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupScrollProgress();
        this.setupCustomCursor();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupScrollIndicator();
    }
    
    // Loading screen
    setupLoading() {
        const hideLoading = () => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        };
        
        // Hide on window load
        window.addEventListener('load', () => {
            setTimeout(hideLoading, 800);
        });
        
        // Fallback: Force hide after 3 seconds no matter what
        setTimeout(hideLoading, 3000);
        
        // Also hide on DOMContentLoaded as backup
        if (document.readyState === 'complete') {
            setTimeout(hideLoading, 800);
        }
    }
    
    // Navigation
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Toggle mobile menu
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Active link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            // Navbar background on scroll
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 15, 30, 0.95)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(15, 15, 30, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Theme toggle
    setupThemeToggle() {
        const themeSwitch = document.getElementById('theme-switch');
        const root = document.documentElement;
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            root.setAttribute('data-theme', 'light');
            themeSwitch.checked = true;
        }
        
        themeSwitch?.addEventListener('change', () => {
            if (themeSwitch.checked) {
                root.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Scroll progress bar
    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            const scrollProgress = document.querySelector('.scroll-progress');
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }
    
    // Custom cursor
    setupCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        const animateFollower = () => {
            const distX = mouseX - followerX;
            const distY = mouseY - followerY;
            
            followerX += distX * 0.1;
            followerY += distY * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();
        
        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
        
        // Hide cursor on mobile
        if (window.innerWidth < 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    }
    
    // Project filters
    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Contact form
    setupContactForm() {
        const form = document.getElementById('contactForm');
        
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
            
            // For actual implementation, use:
            /*
            try {
                const response = await fetch('your-api-endpoint', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    // Success handling
                }
            } catch (error) {
                console.error('Error:', error);
            }
            */
        });
        
        // Input animations
        const inputs = form?.querySelectorAll('input, textarea');
        inputs?.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Scroll indicator
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize portfolio
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    
    // Secret surprise features
    initSecretFeatures();
});

// Secret surprise features
function initSecretFeatures() {
    // Feature 1: Secret achievement system
    let achievements = JSON.parse(localStorage.getItem('portfolioAchievements') || '[]');
    
    // Achievement: First visit
    if (!achievements.includes('first_visit')) {
        achievements.push('first_visit');
        localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
    }
    
    // Feature 2: Click counter on logo
    let clickCount = 0;
    const logo = document.querySelector('.logo-text');
    logo?.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            document.body.style.animation = 'rainbow 3s linear';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
            if (!achievements.includes('rainbow_mode')) {
                achievements.push('rainbow_mode');
                localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
                showAchievement('🌈 Rainbow Mode Unlocked!');
            }
        }
        if (clickCount === 10) {
            activateMatrixMode();
            if (!achievements.includes('matrix_mode')) {
                achievements.push('matrix_mode');
                localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
                showAchievement('💚 Matrix Mode Activated!');
            }
        }
    });
    
    // Feature 3: Secret keyboard shortcuts
    let secretCode = [];
    const code = ['r', 'a', 'm', 'e', 's', 'h'];
    document.addEventListener('keydown', (e) => {
        secretCode.push(e.key.toLowerCase());
        secretCode = secretCode.slice(-6);
        
        if (secretCode.join('') === code.join('')) {
            activateFireworks();
            if (!achievements.includes('secret_code')) {
                achievements.push('secret_code');
                localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
                showAchievement('🎆 Secret Code Discovered!');
            }
        }
    });
    
    // Feature 4: Time-based greeting
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 12) greeting = 'Good Morning! ☀️';
    else if (hour < 18) greeting = 'Good Afternoon! 🌤️';
    else greeting = 'Good Evening! 🌙';
    
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.className = 'secret-notification';
        notification.textContent = greeting;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 2000);
    
    // Feature 5: Scroll milestone achievements
    let scrollMilestone = false;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 90 && !scrollMilestone && !achievements.includes('scroll_master')) {
            scrollMilestone = true;
            achievements.push('scroll_master');
            localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
            showAchievement('📜 Scroll Master Achievement!');
        }
    });
    
    // Feature 6: Project click tracker
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', () => {
            const projectsViewed = parseInt(localStorage.getItem('projectsViewed') || '0') + 1;
            localStorage.setItem('projectsViewed', projectsViewed.toString());
            
            if (projectsViewed === 5 && !achievements.includes('curious_explorer')) {
                achievements.push('curious_explorer');
                localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
                showAchievement('🔍 Curious Explorer Badge!');
            }
        });
    });
}

function showAchievement(text) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">${text}</div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => achievement.classList.add('show'), 100);
    setTimeout(() => {
        achievement.classList.remove('show');
        setTimeout(() => achievement.remove(), 500);
    }, 4000);
}

function activateMatrixMode() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'RAMESHKADARIYA01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    let frameCount = 0;
    const maxFrames = 300;
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        frameCount++;
        if (frameCount < maxFrames) {
            requestAnimationFrame(draw);
        } else {
            canvas.style.opacity = '0';
            canvas.style.transition = 'opacity 1s';
            setTimeout(() => canvas.remove(), 1000);
        }
    }
    
    draw();
}

function activateFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight * 0.5 + 'px';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 300);
    }
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
