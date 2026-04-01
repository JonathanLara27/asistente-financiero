import { Injectable, signal } from '@angular/core';
import { CardEntity } from '../../domain/entities/card.entity';

@Injectable({ providedIn: 'root' })
export class CardState {

    // Lista privada de tarjetas
    private _cards = signal<CardEntity[]>([]);

    // Exponemos la lista como solo lectura
    public cards = this._cards.asReadonly();

    // Cargamos datos simulados basados en tu UI
    public loadCards() {
        const mockCards: CardEntity[] = [
            {
                id: 'c1',
                type: 'visa',
                lastFour: '4582',
                holder: 'Vianet One',
                limit: 5000,
                closingDay: 15,
                paymentDay: 5,
                color: 'from-blue-600 to-indigo-900',
                isActive: true,
            },
            {
                id: 'c2',
                type: 'mastercard',
                lastFour: '9123',
                holder: 'Vianet One',
                limit: 2500,
                closingDay: 20,
                paymentDay: 10,
                color: 'from-green-500 to-teal-800',
                isActive: true,
            },
            {
                id: 'c3',
                type: 'visa',
                lastFour: '3456',
                holder: 'Vianet One',
                limit: 3000,
                closingDay: 10,
                paymentDay: 1,
                color: 'from-purple-500 to-pink-800',
                isActive: false,
            }
        ];
        this._cards.set(mockCards);
    }

    public addCard(card: Omit<CardEntity, 'id' | 'color'>) {
        const newCard: CardEntity = {
            ...card,
            id: crypto.randomUUID(),
            // Asignamos un gradiente aleatorio al crear
            color: card.type === 'visa' ? 'from-blue-500 to-indigo-800' : 'from-orange-400 to-red-600'
        };
        this._cards.update(cards => [...cards, newCard]);
    }

    public archiveCard(id: string) {
        this._cards.update(cards =>
            cards.map(c => c.id === id ? { ...c, isActive: false } : c)
        );
    }
}