document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });

    // Initialize typed.js for hero section typewriter effect - modified to type once and stop
    if (document.querySelector('.animate-text')) {
        new Typed('.animate-text span', {
            strings: ['Amin Akhshi'],
            typeSpeed: 70,
            startDelay: 500,
            showCursor: true,
            cursorChar: '',
            loop: false
        });
    }

    // Function to get particles configuration based on theme
    const getParticlesConfig = () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        return {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: isDarkMode ? "#ffffff" : "#000000" },
                shape: { type: "circle" },
                opacity: { value: isDarkMode ? 0.5 : 0.3, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: isDarkMode ? "#ffffff" : "#000000",
                    opacity: isDarkMode ? 0.4 : 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        };
    };

    // Initialize particles.js for background effect with theme-aware configuration
    const initParticles = () => {
        if (document.getElementById('home')) {
            // Clear any existing particles instance first
            if (window.pJSDom && window.pJSDom.length > 0) {
                // This destroys all existing particles.js instances
                window.pJSDom.forEach(dom => dom.pJS.fn.vendors.destroypJS());
                window.pJSDom = [];
            }
            
            // Initialize with current theme configuration
            particlesJS("home", getParticlesConfig());
        }
    };

    // Initial particles setup
    initParticles();

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', e => {
            cursor.setAttribute('style', `top: ${e.pageY - 10}px; left: ${e.pageX - 10}px;`);
        });
        
        document.addEventListener('click', () => {
            cursor.classList.add('expand');
            setTimeout(() => {
                cursor.classList.remove('expand');
            }, 500);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Active menu item on scroll
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            if (section.offsetTop <= scrollPosition && 
                (section.offsetTop + section.offsetHeight) > scrollPosition) {
                
                const currentId = section.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 100);
                } else {
                    if (item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 100);
                    } else {
                        item.classList.remove('show');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Animate skills on scroll
    const animateSkills = () => {
        const skills = document.querySelectorAll('.progress-bar');
        skills.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0%';
            skill.style.transition = 'none';
            
            setTimeout(() => {
                skill.style.width = width;
                skill.style.transition = 'width 1.5s ease-in-out';
            }, 200);
        });
    };

    // Trigger skill animation when scrolling to the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(skillsSection);
    }

    // Form submission with validation and animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Very basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Here you would send the form data to your server
                // For now we'll just simulate a successful submission
                
                // Disable submit button and show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission delay
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
                    successMessage.innerText = 'Your message has been sent successfully!';
                    contactForm.appendChild(successMessage);
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('animate__fadeIn');
                        successMessage.classList.add('animate__fadeOut');
                        setTimeout(() => {
                            successMessage.remove();
                        }, 1000);
                    }, 5000);
                    
                }, 2000);
            }
        });
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });

    // Theme toggle functionality (optional)
    const addThemeToggler = () => {
        const footer = document.querySelector('footer .container');
        if (footer) {
            const themeToggler = document.createElement('div');
            themeToggler.className = 'theme-toggler mt-3';
            themeToggler.innerHTML = '<button class="btn btn-sm btn-outline-light"><i class="fas fa-moon"></i> Dark Mode</button>';
            footer.appendChild(themeToggler);
            
            const toggleButton = themeToggler.querySelector('button');
            toggleButton.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    toggleButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
                } else {
                    toggleButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
                }
                
                // Reinitialize particles with new theme colors
                initParticles();
            });
        }
    };
    
    addThemeToggler();

    // Timeline animation with Intersection Observer - improved implementation
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll(".timeline ol li");
        
        if (timelineItems.length === 0) {
            console.log("Timeline items not found - check your selectors");
            return;
        }
        
        console.log(`Found ${timelineItems.length} timeline items to animate`);
        
        // Check for IntersectionObserver support
        if (!('IntersectionObserver' in window)) {
            console.log("IntersectionObserver not supported, applying animation immediately");
            timelineItems.forEach(item => item.classList.add("in-view"));
            return;
        }

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    console.log("Timeline item in view:", entry.target);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px" 
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Run timeline initialization after a short delay to ensure DOM is fully ready
    setTimeout(initTimelineAnimation, 500);
});

// Circle Rating System
// Find all rating items
const ratings = document.querySelectorAll(".rating");

// Iterate over all rating items
ratings.forEach((rating) => {
  // Get content and get score as an int
  const ratingContent = rating.innerHTML;
  const ratingScore = parseInt(ratingContent, 10);

  // Define if the score is good, meh or bad according to its value
  const scoreClass =
    ratingScore < 40 ? "bad" : ratingScore < 60 ? "meh" : "good";

  // Add score class to the rating
  rating.classList.add(scoreClass);

  // After adding the class, get its color
  const ratingColor = window.getComputedStyle(rating).backgroundColor;

  // Define the background gradient according to the score and color
  const gradient = `background: conic-gradient(${ratingColor} ${ratingScore}%, transparent 0 100%)`;

  // Set the gradient as the rating background
  rating.setAttribute("style", gradient);

  // Wrap the content in a tag to show it above the pseudo element that masks the bar
  rating.innerHTML = `<span>${ratingScore}${
    ratingContent.indexOf("%") >= 0 ? "<small>%</small>" : ""
  }</span>`;
});
