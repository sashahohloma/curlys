import jump from 'jump.js';

document.querySelectorAll('.smooth').forEach((link: Element): void => {
    link.addEventListener('click', (event: Event): void => {
        void event.preventDefault();

        const href: string | null = link.getAttribute('href');

        if (typeof href === 'string') {
            void jump(href, {
                duration: 600,
                offset: 0,
            });
        }
    });
});
