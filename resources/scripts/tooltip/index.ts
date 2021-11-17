import tippy from 'tippy.js';

document.addEventListener('DOMContentLoaded', () => {
    const template = document.getElementById('template_parameters');
    if (template !== null) {
        tippy('.tooltip', {
            content: template.innerHTML,
            allowHTML: true,
            placement: 'top',
        });
    }
});
