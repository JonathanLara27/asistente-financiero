export type CardBrand = 'visa' | 'mastercard';

export interface CardEntity {
    id: string;
    type: CardBrand;
    lastFour: string;
    holder: string;
    limit: number;
    closingDay: number;
    paymentDay: number;
    color: string; // Ej: 'from-purple-500 to-indigo-900'
    isActive: boolean;
}