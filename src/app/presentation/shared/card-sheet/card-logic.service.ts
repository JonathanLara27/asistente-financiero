import { Injectable, computed, inject } from '@angular/core';
import { submit } from '@angular/forms/signals';
import { CardStateService } from './card-state.service';
import { CardFormService } from './card-form.service';
import { CardCreate } from './card.schema';
import { CardBrand } from '../../../domain/entities/card.entity';

@Injectable()
export class CardLogicService {
    private stateService = inject(CardStateService);
    private formService = inject(CardFormService);

    private _cardModel = this.stateService.cardModel;
    public cardModel = this._cardModel.asReadonly();
    public cardForm = this.formService.cardForm;

    public setType(type: CardBrand) {
        this.stateService.updateField('type', type);
    }

    public reset() {
        this.formService.resetForm();
    }

    public onSubmit(event: Event, onSaveCallback: (data: CardCreate) => void) {
        event.preventDefault();

        if (this.cardForm().invalid()) {
            this.formService.markAsTouched();
            return;
        }

        submit(this.cardForm, async () => {
            const payload: CardCreate = { ...this._cardModel() };
            console.log("🚀 Payload Nueva Tarjeta:", payload);

            onSaveCallback(payload);
            this.reset();
        });
    }
}