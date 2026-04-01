import { Injectable, computed, inject } from '@angular/core';
import { submit } from '@angular/forms/signals';
import { TransactionStateService } from './transaction-state.service';
import { TransactionFormService } from './transaction-form.service';
import { TransactionCreate } from './transaction.schema';

@Injectable()
export class TransactionLogicService {
  private stateService = inject(TransactionStateService);
  private formService = inject(TransactionFormService);

  private _transactionModel = this.stateService.transactionModel;
  public transactionModel = this._transactionModel.asReadonly();
  public transactionForm = this.formService.transactionForm;

  public reset() {
    this.formService.resetForm();
  }

  public onSubmit(event: Event, onSaveCallback: (data: TransactionCreate) => void) {
    event.preventDefault();

    if (this.transactionForm().invalid()) {
      this.formService.markAsTouched();
      return;
    }

    submit(this.transactionForm, async () => {
      // Ahora el payload es simplemente el modelo actual, ya incluye la fecha
      const payload: TransactionCreate = { ...this._transactionModel() };

      console.log("🚀 Payload de Gasto:", payload);
      
      onSaveCallback(payload);
      this.reset();
    });
  }
}