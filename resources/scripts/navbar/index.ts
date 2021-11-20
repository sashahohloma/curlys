document.addEventListener('DOMContentLoaded', () => {

    const navButtonElement = document.getElementById('navbar__toggle');
    const navButtonBurger = document.querySelectorAll('.navbar__burger');

    const navbarElement = document.getElementById('navbar__nav');
    const navbarLinks = document.querySelectorAll('.navbar__anchor');

    if (navButtonElement !== null && navbarElement !== null) {
        navButtonElement.addEventListener('click', () => {
            navbarElement.classList.toggle('navbar__nav_visible');
            navButtonBurger.forEach(burgerEl => {
                burgerEl.classList.toggle('navbar__burger_active');
            });
        });

        navbarLinks.forEach(links => {
            links.addEventListener('click', () => {
                navbarElement.classList.remove('navbar__nav_visible');
                navButtonBurger.forEach(burgerEl => {
                    burgerEl.classList.toggle('navbar__burger_active');
                });
            });
        });
    }

});
