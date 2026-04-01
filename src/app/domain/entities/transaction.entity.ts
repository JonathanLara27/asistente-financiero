export type TransactionType = 'income' | 'expense';

export interface TransactionEntity {
    id: string;
    concept: string;
    amount: number;
    date: string;
    category: string;
    type: TransactionType;
    cardId?: string;
    isTaxDeductible?: boolean;
    ruc?: string;
}