export enum FieldName {
    name = 'name',
    photo = 'photo',
    rating = 'rating',
    text = 'text',
    slug = 'slug',
}

export interface ReviewFormFields {
    [FieldName.name]: string;
    [FieldName.photo]: File | null;
    [FieldName.rating]: string;
    [FieldName.text]: string;
    [FieldName.slug]: string;
}
