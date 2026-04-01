import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CardEntity } from '../../../../../domain/entities/card.entity';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-credit-card',
  imports: [
    CurrencyPipe, NgClass
  ],
  templateUrl: './credit-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCard { 

  card = input.required<CardEntity>();
  showNumbers = signal(false);

  toggleNumbers(event: Event) {
    event.stopPropagation();
    this.showNumbers.update(v => !v);
  }

}
