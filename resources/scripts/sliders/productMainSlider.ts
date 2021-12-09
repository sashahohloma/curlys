import Splide from '@splidejs/splide';

const activeThumbClassName = 'main__thumbnails--item__active';

const productSliderElement = document.getElementById('product_main_slider');
const thumbsElements = document.querySelectorAll('.main__thumbnails--item');

if (productSliderElement !== null) {
    const productSlider = new Splide(productSliderElement, {
        type: 'fade',
        perPage: 1,
        drag: false,
        arrows: false,
        pagination: false,
        fixedHeight: 540,
        breakpoints: {
            546: {
                fixedHeight: 280,
            },
        },
    });

    productSlider.on('mounted', () => {
        thumbsElements?.[0].classList.add(activeThumbClassName);
    });

    thumbsElements.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            productSlider.Components.Controller.go(index, false);
            thumbsElements.forEach(t => t.classList.remove(activeThumbClassName));
            thumb.classList.add(activeThumbClassName);
        });
    });

    productSlider.mount();
}
