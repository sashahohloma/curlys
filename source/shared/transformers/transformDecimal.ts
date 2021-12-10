import { ValueTransformer } from 'typeorm';

export const transformDecimal: ValueTransformer = {
    to: (value: number): string => value.toString(),
    from: (value: string): number => parseFloat(value),
};
