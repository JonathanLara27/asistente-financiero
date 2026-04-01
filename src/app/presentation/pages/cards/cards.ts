import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CardState } from '../../../application/state/card.state';
import { CardSheet } from '../../shared/card-sheet/card-sheet';
import { CardsHeader } from './components/cards-header/cards-header';
import { CardsCarousel } from './components/cards-carousel/cards-carousel';
import { CardDetails } from './components/card-details/card-details';
import { ConfirmModal } from '../../shared/confirm-modal/confirm-modal';

@Component({
  selector: 'app-cards',
  imports: [
    CardsHeader, CardSheet, CardsCarousel, CardDetails,
    ConfirmModal,
  ],
  templateUrl: './cards.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cards { 

  private cardState = inject(CardState);
  public isAddingCard = signal<boolean>(false);

  public activeCardIndex = signal(0);

  public cards = this.cardState.cards;
  public totalCards = computed(() => this.cards().length);

  public cardToArchiveId = signal<string | null>(null);

  // PARA PODER RE RENDERIZAR EL CARD Y PODER DARLE SU ANIMACION.
  public activeCardAsArray = computed(() => {
    const card = this.activeCard();
    return card ? [card] : [];
  });

  public activeCard = computed(() => {
    const cards = this.cards();
    const index = this.activeCardIndex();
    return cards.length > 0 ? cards[index] : null;
  });

  ngOnInit() {
    this.cardState.loadCards();
  }

  public openAddCard() {
    this.isAddingCard.set(true);
  }

  public closeAddCard() {
    this.isAddingCard.set(false);
  }

  public handleSaveCard(newCard: any) {
    this.cardState.addCard(newCard);
  }

  public confirmArchiveCard() {
    const id = this.cardToArchiveId();
    if(!id) return;
    
    this.cardState.archiveCard(id);
    this.cardToArchiveId.set(null);
  }

  public cancelArchiveCard() {
    this.cardToArchiveId.set(null);
  }

  // Métodos vacíos listos para la siguiente fase
  public handleArchive(cardId: string) {
    this.cardToArchiveId.set(cardId);
  }

  public handleConfigure(cardId: string) {
    console.log('Solicitud para configurar tarjeta:', cardId);
    // Aquí abriremos el sheet en modo edición
  }

}
