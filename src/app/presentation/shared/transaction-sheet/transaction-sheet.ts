import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStateService } from './transaction-state.service';
import { TransactionFormService } from './transaction-form.service';
import { TransactionLogicService } from './transaction-logic.service';
import { TransactionCreate } from './transaction.schema';
import { FormFieldError } from '../form-field-error/form-field-error';
import { FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';

const SHEET_UI = {
  title: 'Nuevo Gasto',
  amountLabel: 'Monto (S/)',
  amountPlaceholder: '0.00',
  conceptLabel: 'Concepto',
  conceptPlaceholder: 'Ej. Almuerzo, Pasajes...',
  categoryLabel: 'Categoría',
  dateLabel: 'Fecha',
  submitBtn: 'Guardar Gasto'
};

@Component({
  selector: 'app-transaction-sheet',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldError,
    FormField,
    FormsModule,
    ],
  templateUrl: './transaction-sheet.html',
  providers: [TransactionStateService, TransactionFormService, TransactionLogicService]
})
export class TransactionSheet {
  private logic = inject(TransactionLogicService);
  public ui = SHEET_UI;

  public transactionForm = this.logic.transactionForm;

  public categories = signal([
    { id: 'Alimentación', label: 'Alimentación' },
    { id: 'Transporte', label: 'Transporte' },
    { id: 'Ocio', label: 'Ocio' },
    { id: 'Servicios', label: 'Servicios' }
  ]);

  isOpen = input.required<boolean>();
  onClose = output<void>();
  onSave = output<TransactionCreate>(); // Ya no le concatenamos la fecha aquí

  closeSheet() {
    this.logic.reset();
    this.onClose.emit();
  }

  handleSubmit(event: Event) {
    this.logic.onSubmit(event, (payload) => {
      this.onSave.emit(payload);
      this.onClose.emit();
    });
  }
}