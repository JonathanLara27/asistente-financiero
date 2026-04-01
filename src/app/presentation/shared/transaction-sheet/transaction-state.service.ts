import { Injectable, signal } from '@angular/core';
import { TransactionCreate, TRANSACTION_INIT } from './transaction.schema';

@Injectable()
export class TransactionStateService {
    // Signal público y mutable para que el FormService pueda conectarse a él
    public transactionModel = signal<TransactionCreate>(TRANSACTION_INIT);

    public resetToInitialData() {
        this.transactionModel.set(TRANSACTION_INIT);
    }

    public updateField<K extends keyof TransactionCreate>(field: K, value: TransactionCreate[K]) {
        this.transactionModel.update(state => ({
            ...state,
            [field]: value
        }));
    }
}