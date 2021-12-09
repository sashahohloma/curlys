import Splide from '@splidejs/splide';

const startAnimation = (element: Element, selector: string, className: string): void => {
    const child = element.querySelector(selector);
    if (child !== null) {
        child.classList.add(className);
        child.addEventListener('animationend', () => {
            child.classList.remove(className);
        });
    }
};

const slidesAnimation = (mainSlider: Splide, index?: number) => {
    const slides = mainSlider.Components.Slides.get(true);
    const activeIndex = index ?? slides.findIndex(s => !s.isClone);

    startAnimation(slides[activeIndex].slide, '.collage__image', 'bounce__image');
    startAnimation(slides[activeIndex].slide, '.collage__oval_orange', 'bounce__orange');
    startAnimation(slides[activeIndex].slide, '.collage__oval_red', 'bounce__red');

    slides.forEach(sl => sl.slide.classList.remove('main__slide_active'));
    slides[activeIndex].slide.classList.add('main__slide_active');
};

const mainSliderElement = document.getElementById('main_slider');
if (mainSliderElement) {
    const mainSlider = new Splide(mainSliderElement, {
        type: 'loop',
        perPage: 1,
        drag: false,
        arrows: false,
        pagination: false,
        pauseOnHover: false,
        autoplay: true,
        interval: 9000,
        speed: 600,
    });

    mainSlider.on('mounted', () => {
        slidesAnimation(mainSlider);
    });

    mainSlider.on('move', (nextIndex) => {
        slidesAnimation(mainSlider, nextIndex);
    });

    mainSlider.mount();
}
