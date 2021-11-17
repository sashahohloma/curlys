import Swiper, { Autoplay } from 'swiper';

const startAnimation = (element: Element, selector: string, classname: string): void => {
    const child = element.querySelector(selector);
    if (child !== null) {
        child.classList.add(classname);
        child.addEventListener('animationend', () => {
            child.classList.remove(classname);
        });
    }
};

const slidesAnimation = (swiper: Swiper) => {
    startAnimation(swiper.slides[swiper.activeIndex], '.collage__image', 'bounce__image');
    startAnimation(swiper.slides[swiper.activeIndex], '.collage__oval_orange', 'bounce__orange');
    startAnimation(swiper.slides[swiper.activeIndex], '.collage__oval_red', 'bounce__red');

    swiper.slides.forEach(sl => sl.classList.remove('main__slide_active'));
    swiper.slides[swiper.activeIndex].classList.add('main__slide_active');
};

export const mainSwiper = new Swiper('.main__swiper', {
    modules: [
        Autoplay,
    ],
    loop: true,
    allowTouchMove: false,
    slidesPerView: 1,
    speed: 450,
    autoplay: {
        delay: 900000,
    },
    on: {
        afterInit: slidesAnimation,
        slideChangeTransitionStart: slidesAnimation,
    }
});
