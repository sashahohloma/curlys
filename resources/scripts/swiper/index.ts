import Swiper, { Autoplay, Navigation } from 'swiper';

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
    swiper.slides.forEach((element: Element) => {
        startAnimation(element, '.main__image', 'bounce__image');
        startAnimation(element, '.main__oval_orange', 'bounce__orange');
        startAnimation(element, '.main__oval_red', 'bounce__red');
    });
};

export const slider = new Swiper('.swiper', {
    modules: [
        Autoplay,
        Navigation,
    ],
    loop: true,
    allowTouchMove: false,
    speed: 450,
    autoplay: {
        delay: 9000,
    },
    // navigation: {
    //     nextEl: '.main__next',
    //     prevEl: '.main__prev',
    // },
    on: {
        afterInit: slidesAnimation,
        slideChangeTransitionStart: slidesAnimation,
    }
});
