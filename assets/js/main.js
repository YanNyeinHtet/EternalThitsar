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
    const logoMark = document.querySelector('.logo svg');
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
});
