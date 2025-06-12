// Luxury Minimalist Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navItems = document.querySelectorAll('.nav-menu li');
    const header = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');

    // Set index for each nav item for staggered animation
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    hamburger.addEventListener('click', function() {
        // Toggle menu visibility
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a menu item
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // Hide nav-menu on desktop when scrolled
            if (window.innerWidth > 700) {
                navMenu.classList.add('nav-menu--hidden');
            }
        } else {
            header.classList.remove('scrolled');
            navMenu.classList.remove('nav-menu--hidden');
        }
    });

    // Ensure nav-menu is visible on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 700) {
            navMenu.classList.remove('nav-menu--hidden');
            navMenu.style.pointerEvents = '';
            navMenu.style.visibility = '';
        }
    });

    // Logo mark rotation on scroll
    const logoMark = document.querySelector('.navbar-logo-mark');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function rotateLogoMark() {
        const angle = window.scrollY / 4; // 1 degree per 4px scrolled
        logoMark.style.transform = `rotate(${angle}deg)`;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(rotateLogoMark);
            ticking = true;
        }
    });
    // Initial rotation
    rotateLogoMark();

    // --- Smooth scroll snapping between sections ---
    const sections = Array.from(document.querySelectorAll('main > section'));
    let isScrolling = false;

    function getCurrentSectionIndex() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        let closestIdx = 0;
        let minDist = Infinity;
        sections.forEach((section, idx) => {
            const rect = section.getBoundingClientRect();
            const dist = Math.abs(rect.top);
            if (dist < minDist) {
                minDist = dist;
                closestIdx = idx;
            }
        });
        return closestIdx;
    }

    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        const idx = getCurrentSectionIndex();
        if (e.deltaY > 0 && idx < sections.length - 1) {
            isScrolling = true;
            sections[idx + 1].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 700);
            e.preventDefault();
        } else if (e.deltaY < 0 && idx > 0) {
            isScrolling = true;
            sections[idx - 1].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 700);
            e.preventDefault();
        }
    }, { passive: false });

    // --- Animate in/out for Symbol and Wordmark sections ---
    const animatedSections = [
        document.querySelector('.symbol-section'),
        document.querySelector('.wordmark-section')
    ];
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate-in');
                entry.target.classList.remove('section-animate-out');
            } else {
                entry.target.classList.remove('section-animate-in');
                entry.target.classList.add('section-animate-out');
            }
        });
    }, {
        threshold: 0.35
    });
    animatedSections.forEach(section => {
        if (section) observer.observe(section);
    });
});
