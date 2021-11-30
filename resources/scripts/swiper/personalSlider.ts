document.addEventListener('DOMContentLoaded', () => {
    let index = 0;

    const slides = document.querySelectorAll('.personal__slide');
    const interval = 1000;

    window.setInterval(() => {
        const nextIndex = index + 1;
        index = nextIndex < slides.length ? nextIndex : 0;

        slides.forEach(el => el.classList.remove('personal__slide_visible'));
        slides[index].classList.add('personal__slide_visible');
    }, interval);
});
