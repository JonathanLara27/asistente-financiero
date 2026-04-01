import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CardEntity } from '../../../../../domain/entities/card.entity';
import { calculateSemaphoreStatus } from '../../../../../shared/utils/semaphore.util';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-card-details',
  imports: [
    CurrencyPipe,
    NgClass,
  ],
  templateUrl: './card-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetails {

  card = input.required<CardEntity>();
  consumedAmount = input<number>(0);

  // Eventos puros
  onConfigure = output<string>();
  onArchive = output<string>();

  // Señal derivada: Si la tarjeta cambia, el semáforo se recalcula automáticamente
  semaphore = computed(() => {
    const c = this.card();
    return calculateSemaphoreStatus(c.closingDay, c.paymentDay);
  });

 }
