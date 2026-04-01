import { Injectable, signal } from '@angular/core';
import { CardCreate, CARD_INIT } from './card.schema';

@Injectable()
export class CardStateService {
    public cardModel = signal<CardCreate>(CARD_INIT);

    public resetToInitialData() {
        this.cardModel.set(CARD_INIT);
    }

    public updateField<K extends keyof CardCreate>(field: K, value: CardCreate[K]) {
        this.cardModel.update(state => ({
            ...state,
            [field]: value
        }));
    }
}