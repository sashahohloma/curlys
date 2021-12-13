import { createForm } from 'final-form';
import ky from 'ky';
import { FieldName, ReviewFormFields } from './models';
import { reviewFormModal } from './modal';
import { showToast } from '../toast';

const reviewForm = document.querySelector<HTMLFormElement>('#review_form');
const slugInputField = reviewForm?.querySelector<HTMLInputElement>('input[type=hidden]');
const inputTextFields = reviewForm?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[type=text], textarea');
const inputFileFields = reviewForm?.querySelectorAll<HTMLInputElement>('input[type=file]');
const inputRadioFields = reviewForm?.querySelectorAll<HTMLInputElement>('input[type=radio]');

const getRatingValue = () => Array.from(inputRadioFields ?? []).find(r => r.checked)?.value;

export const form = createForm<ReviewFormFields>({
    onSubmit: async(values) => {
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            await ky('/api/v1/reviews/create', {
                method: 'post',
                body: formData,
            });
            reviewFormModal?.hide();
            showToast('Ваш отзыв успешно отправлен, спасибо за ваше мнение!');
        } catch (error) {
            showToast(error instanceof Error ? error.message : 'Неизвестная ошибка');
        }
    },
    validate: (values: Partial<ReviewFormFields>) => {
        const errors: Partial<Record<keyof ReviewFormFields, string>> = {};
        const nameMinLength = 4;
        const textMinLength = 10;

        if (typeof values.name !== 'string') {
            errors.name = 'Заполните ваше имя';
        }
        if (typeof values.name === 'string' && values.name.length < nameMinLength) {
            errors.name = `Имя должно содержать более ${nameMinLength} символов`;
        }
        if (typeof values.text !== 'string') {
            errors.text = 'Заполните текст отзыва';
        }
        if (typeof values.text === 'string' && values.text.length < textMinLength) {
            errors.text = `Текст отзыва должен содержать более ${textMinLength} символов`;
        }
        return errors;
    },
    initialValues: {
        rating: getRatingValue(),
        slug: slugInputField?.value,
    },
});

const getFieldName = (field: string): FieldName => {
    const name = Object.values(FieldName).find(f => f === field);
    if (name === undefined) {
        throw new Error('Неизвестное поле');
    }
    return name;
};

const registerTextField = (input: HTMLInputElement | HTMLTextAreaElement): void => {
    const name = getFieldName(input.name);
    form.registerField(name, (fieldState) => {

        const errorEl = document.querySelector<HTMLDivElement>(`#${input.id}--error`);
        if (errorEl === null) {
            throw new Error('Невозможно инициализировать валидацию формы без элемента для указания ошибки');
        }

        input.addEventListener('blur', () => blur());
        input.addEventListener('input', (event) => {
            fieldState.change((event.target as HTMLInputElement | HTMLTextAreaElement).value);
        });
        input.addEventListener('focus', () => focus());

        if (fieldState.touched && typeof fieldState.error === 'string') {
            errorEl.innerHTML = fieldState.error;
            input.classList.add('is-invalid');
        } else {
            errorEl.innerHTML = '';
            input.classList.remove('is-invalid');
        }
    }, {
        value: true,
        error: true,
        touched: true,
    });
};

const registerFileField = (input: HTMLInputElement): void => {
    const name = getFieldName(input.name);
    form.registerField(name, (fieldState) => {

        input.addEventListener('blur', () => blur());
        input.addEventListener('input', (event) => {
            fieldState.change((event.target as HTMLInputElement)?.files?.[0] ?? null);
        });
        input.addEventListener('focus', () => focus());
    }, {
        value: true,
        touched: true,
    });
};

const registerRadioField = (input: HTMLInputElement): void => {
    const name = getFieldName(input.name);
    form.registerField(name, (fieldState) => {
        input.addEventListener('blur', () => blur());
        input.addEventListener('input', () => {
            fieldState.change(getRatingValue());
        });
        input.addEventListener('focus', () => focus());
    }, {
        value: true,
        touched: true,
    });
};

reviewForm?.addEventListener('submit', async(event): Promise<void> => {
    event.preventDefault();
    await form.submit();
});

inputTextFields?.forEach((inputTextField) => registerTextField(inputTextField));
inputFileFields?.forEach((inputFileField) => registerFileField(inputFileField));
inputRadioFields?.forEach((inputRadioField) => registerRadioField(inputRadioField));
