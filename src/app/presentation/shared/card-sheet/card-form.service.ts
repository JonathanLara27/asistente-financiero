import { Injectable, inject } from '@angular/core';
import { form } from '@angular/forms/signals';
import { CardStateService } from './card-state.service';
import { cardValidationSchema } from './card.schema';

@Injectable()
export class CardFormService {
    private cardState = inject(CardStateService);

    public cardForm = form(this.cardState.cardModel, cardValidationSchema);

    public markAsTouched() {
        this.cardForm().markAsTouched();
    }

    public resetForm() {
        this.cardState.resetToInitialData();
        this.cardForm().reset();
    }
}