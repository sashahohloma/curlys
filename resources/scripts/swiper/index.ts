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
    startAnimation(swiper.slides[swiper.activeIndex], '.main__image', 'bounce__image');
    startAnimation(swiper.slides[swiper.activeIndex], '.main__oval_orange', 'bounce__orange');
    startAnimation(swiper.slides[swiper.activeIndex], '.main__oval_red', 'bounce__red');
};

export const slider = new Swiper('.swiper', {
    modules: [
        Autoplay,
    ],
    loop: true,
    allowTouchMove: false,
    speed: 450,
    autoplay: {
        delay: 9000,
    },
    on: {
        afterInit: slidesAnimation,
        slideChangeTransitionStart: slidesAnimation,
    }
});
