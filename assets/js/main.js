// Luxury Minimalist Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navItems = document.querySelectorAll('.nav-menu li');
    
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
});
