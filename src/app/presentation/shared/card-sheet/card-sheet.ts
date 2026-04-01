import { Component, input, output, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from '@angular/forms/signals';
import { CardStateService } from './card-state.service';
import { CardFormService } from './card-form.service';
import { CardLogicService } from './card-logic.service';
import { CardCreate } from './card.schema';
import { FormFieldError } from '../form-field-error/form-field-error';

const SHEET_UI = {
  title: 'Nueva Tarjeta',
  lastFourLabel: 'Últimos 4 dígitos',
  lastFourPlaceholder: '0000',
  limitLabel: 'Límite de crédito (S/)',
  limitPlaceholder: '5000',
  closingDayLabel: 'Día de corte',
  closingDayPlaceholder: '15',
  paymentDayLabel: 'Día de pago',
  paymentDayPlaceholder: '5',
  submitBtn: 'Agregar Tarjeta'
};

@Component({
  selector: 'app-card-sheet',
  imports: [CommonModule, FormField, FormFieldError],
  providers: [CardStateService, CardFormService, CardLogicService],
  templateUrl: './card-sheet.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSheet {

  private logic = inject(CardLogicService);
  public ui = SHEET_UI;
  public cardForm = this.logic.cardForm;

  isOpen = input.required<boolean>();
  onClose = output<void>();
  onSave = output<CardCreate>();

  type = computed(() => this.logic.cardModel().type);

  setType(type: string) {
    return this.logic.setType(type as any);
  }

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
