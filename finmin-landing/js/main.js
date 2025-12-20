document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            }
        });
    });

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    let heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', function() {
        // Sticky navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link on scroll
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.addEventListener('DOMContentLoaded', function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        // Trigger initial animation check
        setTimeout(animateOnScroll, 500);
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Counter animation for stats
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const animateStats = function() {
        statItems.forEach(stat => {
            const target = parseInt(stat.textContent);
            const suffix = stat.textContent.match(/[a-zA-Z%]+/) ? stat.textContent.match(/[a-zA-Z%]+/)[0] : '';
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            updateCount();
        });
    };

    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        // In case the image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Add styles for back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 999;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: var(--primary-dark);
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
});
