import { Injectable, inject } from '@angular/core';
import { form } from '@angular/forms/signals';
import { TransactionStateService } from './transaction-state.service';
import { transactionValidationSchema } from './transaction.schema';

@Injectable()
export class TransactionFormService {
    private transactionState = inject(TransactionStateService);

    // Conectamos el Signal del estado con el esquema de validación
    public transactionForm = form(this.transactionState.transactionModel, transactionValidationSchema);

    public markAsTouched() {
        this.transactionForm().markAsTouched();
    }

    public resetForm() {
        this.transactionState.resetToInitialData();
        this.transactionForm().reset();
    }
}