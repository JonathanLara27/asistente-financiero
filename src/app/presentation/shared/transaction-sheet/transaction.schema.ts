import { required, min, SchemaPathTree, minLength } from '@angular/forms/signals';
import { TransactionType } from '../../../domain/entities/transaction.entity';

export interface TransactionCreate {
    type: TransactionType;
    amount: number | null;
    concept: string;
    category: string;
    date: string;
}

export const TRANSACTION_INIT: TransactionCreate = {
    type: 'expense',
    amount: null,
    concept: '',
    category: 'Alimentación',
    date: new Date().toISOString().split('T')[0]
};

export const transactionValidationSchema = (schemaPath: SchemaPathTree<TransactionCreate>) => {
    required(schemaPath.amount, { message: 'El monto es obligatorio' });
    min(schemaPath.amount, 0.1, { message: 'El monto debe ser mayor a 0' });

    required(schemaPath.concept, { message: 'El concepto es obligatorio' });
    minLength(schemaPath.concept, 3, { message: 'El concepto debe tener al menos 3 caracteres' });

    // Nueva validación
    required(schemaPath.date, { message: 'La fecha es obligatoria' });
};