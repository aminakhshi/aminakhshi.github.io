// ===== Modern JavaScript for Portfolio Website =====

// Utility function for debouncing
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ===== Initialize when DOM is ready =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize in correct order
    initThemeToggle(); // Load theme first
    initAOS();
    initTyped();
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initFormValidation();
    initSkillBars();
    initPortfolioFilter();
    
    // Initialize particles after a small delay to ensure DOM is ready
    setTimeout(() => {
        initParticles();
    }, 100);
});

// ===== AOS Animation Initialization =====
function initAOS() {
    if (typeof AOS === 'undefined') {
        console.error('AOS library not loaded');
        return;
    }
    
    try {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            delay: 100
        });
        console.log('AOS initialized successfully');
    } catch (error) {
        console.error('Error initializing AOS:', error);
    }
}

// ===== Typed.js for Hero Section =====
function initTyped() {
    const typedElement = document.querySelector('.animate-text span');
    
    if (!typedElement) {
        console.log('Typed.js skipped: no .animate-text span found');
        return;
    }
    
    if (typeof Typed === 'undefined') {
        console.error('Typed.js library not loaded');
        return;
    }
    
    try {
        new Typed('.animate-text span', {
            strings: ['Amin Akhshi'],
            typeSpeed: 70,
            startDelay: 500,
            showCursor: false,
            loop: false
        });
        console.log('Typed.js initialized successfully');
    } catch (error) {
        console.error('Error initializing Typed.js:', error);
    }
}

// ===== Particles.js Configuration =====
function initParticles() {
    const homeSection = document.getElementById('home');
    
    // Only initialize on desktop to preserve performance
    if (!homeSection || window.innerWidth < 768) {
        console.log('Particles skipped: mobile device or no home section');
        return;
    }
    
    if (typeof particlesJS === 'undefined') {
        console.error('Particles.js library not loaded');
        return;
    }
    
    try {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Get the current primary color from CSS variables
        const computedStyle = getComputedStyle(document.documentElement);
        const primaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#4169E1';
        
        console.log('Initializing particles with color:', primaryColor);
        
        particlesJS('home', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: isDarkMode ? '#ffffff' : primaryColor
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: isDarkMode ? 0.3 : 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: isDarkMode ? '#ffffff' : primaryColor,
                    opacity: isDarkMode ? 0.2 : 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
        
        console.log('Particles initialized successfully');
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
}

// ===== Navigation =====
function initNavigation() {
    const nav = document.querySelector('.navigation');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Navigation scroll effect
    const handleScroll = debounce(() => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }

        // Active link highlighting based on scroll position
        highlightActiveSection();
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Set active link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
            link.classList.add('active');
        }
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

// ===== Dark Mode Toggle =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeColorSelector = document.getElementById('theme-color-selector');
    
    if (!themeToggle) return;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentColor = localStorage.getItem('themeColor') || 'blue';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Apply saved color theme
    document.documentElement.setAttribute('data-theme', currentColor);
    if (themeColorSelector) {
        themeColorSelector.value = currentColor;
    }

    // Dark/Light mode toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);

        // Reinitialize particles with new theme
        if (document.getElementById('home') && typeof particlesJS !== 'undefined') {
            // Clear existing particles
            if (window.pJSDom && window.pJSDom.length > 0) {
                window.pJSDom.forEach(dom => dom.pJS.fn.vendors.destroypJS());
                window.pJSDom = [];
            }
            // Reinitialize with new theme
            setTimeout(initParticles, 100);
        }
    });

    // Color theme selector
    if (themeColorSelector) {
        themeColorSelector.addEventListener('change', (e) => {
            const selectedColor = e.target.value;
            document.documentElement.setAttribute('data-theme', selectedColor);
            localStorage.setItem('themeColor', selectedColor);
            
            // Show notification
            showNotification(`Theme changed to ${selectedColor}`, 'success');
            
            // Reinitialize particles with new theme color
            if (document.getElementById('home') && typeof particlesJS !== 'undefined') {
                if (window.pJSDom && window.pJSDom.length > 0) {
                    window.pJSDom.forEach(dom => dom.pJS.fn.vendors.destroypJS());
                    window.pJSDom = [];
                }
                setTimeout(initParticles, 100);
            }
        });
    }
}

// ===== Smooth Scrolling =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navigation')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    const toggleBackToTop = debounce(() => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, 10);

    window.addEventListener('scroll', toggleBackToTop);

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Form Validation =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#f44336';
                } else {
                    input.style.borderColor = '';
                }
            });

            // Email validation
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#f44336';
                }
            }

            if (isValid) {
                // Here you can add your form submission logic
                showNotification('Form submitted successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });

        // Remove error styling on input
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Skill Bars Animation =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    if (skillBars.length === 0) return;

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (barPosition < screenPosition) {
                const width = bar.getAttribute('aria-valuenow') || bar.style.width;
                bar.style.width = width + (width.includes('%') ? '' : '%');
            }
        });
    };

    const debouncedAnimate = debounce(animateSkillBars, 10);
    window.addEventListener('scroll', debouncedAnimate);
    animateSkillBars(); // Initial check
}

// ===== Portfolio Filter =====
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Lazy Loading Images =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== Animation CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Performance Optimization =====
// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom.forEach(dom => dom.pJS.fn.vendors.stop());
        }
    } else {
        // Resume animations when page is visible
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom.forEach(dom => dom.pJS.fn.vendors.start());
        }
    }
});

// Log initialization
console.log('🎉 Portfolio website initialized successfully!');
