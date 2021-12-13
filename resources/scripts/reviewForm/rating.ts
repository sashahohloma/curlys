document.addEventListener('DOMContentLoaded', () => {
    const RATING_STAR_ACTIVE_CLASSNAME = 'reviewFormModal__rating--star_active';

    const ratingLabelList = document.querySelectorAll<HTMLLabelElement>('.reviewFormModal__rating--label');
    const ratingStarList = document.querySelectorAll<SVGElement>('.reviewFormModal__rating--star');
    const ratingInputList = document.querySelectorAll<HTMLInputElement>('.reviewFormModal__rating--input');

    const setActiveStar = (clickedIndex: number): void => {
        ratingStarList.forEach((s) => s.classList.remove(RATING_STAR_ACTIVE_CLASSNAME));
        for (let index = 0; index <= clickedIndex; index++) {
            ratingStarList[index]?.classList.add(RATING_STAR_ACTIVE_CLASSNAME);
        }
    };

    ratingLabelList.forEach((ratingLabeEl, clickedIndex) => {
        ratingLabeEl.addEventListener('click', () => {
            setActiveStar(clickedIndex);
        });
    });

    const initialIndex = Array.from(ratingInputList).findIndex((i) => i.checked === true);
    setActiveStar(initialIndex);
});
