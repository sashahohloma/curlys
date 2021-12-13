document.addEventListener('DOMContentLoaded', () => {
    const PREVIEW_VISIBLE_CLASSNAME = 'reviewFormModal__photoField--preview__visible';
    const REMOVE_VISIBLE_CLASSNAME = 'reviewFormModal__photoField--remove__visible';

    const photoPreviewEl = document.querySelector<HTMLImageElement>('#photo_preview');
    const photoTextEl = document.querySelector<HTMLSpanElement>('#photo_text');
    const photoInputEl = document.querySelector<HTMLInputElement>('#reviewFormModal__photo');
    const photoRemoveEl = document.querySelector<HTMLButtonElement>('#photo_remove');

    if (photoPreviewEl !== null && photoTextEl !== null && photoInputEl !== null && photoRemoveEl !== null) {
        photoInputEl.addEventListener('change', () => {
            const file = photoInputEl.files?.[0];
            if (file) {
                photoTextEl.innerHTML = 'Обновить';
                photoRemoveEl.classList.add(REMOVE_VISIBLE_CLASSNAME);
                photoPreviewEl.classList.add(PREVIEW_VISIBLE_CLASSNAME);
                photoPreviewEl.src = URL.createObjectURL(file);
            }
        });
        photoRemoveEl.addEventListener('click', () => {
            photoInputEl.value = '';
            photoTextEl.innerHTML = 'Загрузите аватарку';
            photoRemoveEl.classList.remove(REMOVE_VISIBLE_CLASSNAME);
            photoPreviewEl.classList.remove(PREVIEW_VISIBLE_CLASSNAME);
            photoPreviewEl.src = '';
        });
    }
});
