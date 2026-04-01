export interface TransactionDTO {
    id_tx: string;
    description: string;
    total_amount: number;
    tx_date: string;
    category_name: string;
    tx_type: 'income' | 'expense';
    card_reference?: string;
    tax_deductible?: boolean;
    tax_ruc?: string;
}