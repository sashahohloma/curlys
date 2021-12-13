import Toastify from 'toastify-js';

export const showToast = (text: string): void => {
    return Toastify({
        text,
        duration: 6000,
        gravity: 'top',
        position: 'center',
        backgroundColor: '#F73D4E',
    }).showToast();
};
