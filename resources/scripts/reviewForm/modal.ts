import Modal from 'bootstrap/js/dist/modal';
import { form } from './validation';

const REVIEW_MODAL_HASH = 'create-review';

const buttonCreateList = document.querySelectorAll('.createReviewAction');
const modalEl = document.getElementById('reviewFormModal');
const modalCloseEl = document.querySelectorAll('.review_close');

export let reviewFormModal: Modal | null = null;

if (modalEl !== null) {
    reviewFormModal = new Modal(modalEl);

    buttonCreateList.forEach((buttonEl) => {
        buttonEl.addEventListener('click', () => {
            if (reviewFormModal !== null) {
                reviewFormModal.show();
            }
        });
    });

    modalCloseEl.forEach((closeEl) => {
        closeEl.addEventListener('click', () => {
            if (reviewFormModal !== null) {
                reviewFormModal.hide();
            }
        });
    });

    modalEl.addEventListener('show.bs.modal', () => {
        window.location.hash = REVIEW_MODAL_HASH;
        form.restart();
    });

    modalEl.addEventListener('hidden.bs.modal', () => {
        history.replaceState(null, '', ' ');
        form.restart();
    });

    const hash = window.location.hash.replace('#', '');
    if (hash === REVIEW_MODAL_HASH) {
        reviewFormModal.show();
    }
}
