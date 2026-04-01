import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { CreditCard } from '../credit-card/credit-card';
import { NgClass } from '@angular/common';
import { CardEntity } from '../../../../../domain/entities/card.entity';

@Component({
  selector: 'app-cards-carousel',
  imports: [
    CreditCard,
    NgClass,
  ],
  styles: [`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `],
  templateUrl: './cards-carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsCarousel {
  cards = input.required<CardEntity[]>();
  initialIndex = input<number>(0);
  onCardChange = output<number>();

  scrollContainer = viewChild.required<ElementRef<HTMLDivElement>>('scrollContainer');
  activeIndex = signal(0);

  constructor() {
    afterNextRender(() => {
      const startIdx = this.initialIndex();
      this.activeIndex.set(startIdx);

      if (startIdx > 0) {
        // La tarjeta es 300px + 16px de gap = 316px
        const scrollPosition = startIdx * 316;
        this.scrollContainer().nativeElement.scrollTo({
          left: scrollPosition,
          behavior: 'instant'
        });
      }
    });
  }

  selectCard(index: number) {
    if (this.activeIndex() !== index) {
      this.activeIndex.set(index);
      this.onCardChange.emit(index);

      // Al hacer clic, centramos esa tarjeta calculando 316px por tarjeta (300 + 16 de gap)
      const scrollPosition = index * 316;
      this.scrollContainer().nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;

    // Matemáticas perfectas gracias al padding dinámico
    const index = Math.round(element.scrollLeft / 316);

    // Evitamos emitir eventos innecesarios si no cambió de índice
    if (index !== this.activeIndex() && index >= 0 && index < this.cards().length) {
      this.activeIndex.set(index);
      this.onCardChange.emit(index);
    }
  }


}
