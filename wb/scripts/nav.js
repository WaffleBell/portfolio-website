document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const burgerIcon = document.getElementById('burger-icon');

    burgerMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        navbar.classList.toggle('black-bg');
        if (burgerIcon.src.includes('burger.svg')) {
            burgerIcon.src = '/wb/nav/burger-close.svg';
        } else {
            burgerIcon.src = '/wb/nav/burger.svg';
        }
    });
});