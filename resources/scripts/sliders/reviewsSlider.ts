import Splide from '@splidejs/splide';

enum PerPage {
    sm = 1,
    md = 2,
    xl = 3,
    screen = 4,
}

const reviewsSliderElement = document.getElementById('reviewsListSlider');

if (reviewsSliderElement !== null) {
    const isShowArrows = (perPage: number) => perPage < reviewsSliderElement.querySelectorAll('.reviews__item').length;
    const reviewsSlider = new Splide(reviewsSliderElement, {
        perMove: 1,
        pagination: false,
        perPage: PerPage.screen,
        arrows: isShowArrows(PerPage.screen),
        gap: 20,
        breakpoints: {
            546: {
                perPage: PerPage.sm,
                arrows: isShowArrows(PerPage.sm),
            },
            768: {
                perPage: PerPage.md,
                arrows: isShowArrows(PerPage.md),
            },
            1200: {
                perPage: PerPage.xl,
                arrows: isShowArrows(PerPage.xl),
            },
        },
    });

    reviewsSlider.mount();
}
