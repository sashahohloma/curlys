import tippy from 'tippy.js';

document.addEventListener('DOMContentLoaded', () => {
    const parametersTooltip = document.getElementById('tooltipContent_parameters');
    if (parametersTooltip !== null) {
        tippy('.tooltip_parameters', {
            content: parametersTooltip.innerHTML,
            allowHTML: true,
            placement: 'top',
        });
    }

    const priceTooltip = document.getElementById('tooltipContent_price');
    if (priceTooltip !== null) {
        tippy('.tooltip_price', {
            content: priceTooltip.innerHTML,
            allowHTML: true,
            placement: 'top',
        });
    }
});
