import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common'; // ¡Crucial para el formateo de la moneda!

@Component({
  selector: 'app-balance-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './balance-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceCard {
  // Inputs requeridos (Si no se pasan, Angular dará error en compilación)
  balance = input.required<number>();
  incomeIcon = input.required<string>();

  // Inputs con valores por defecto
  label = input<string>('Saldo Total');
  growth = input<string>('+12.5%'); // Puedes dejarlo vacío si quieres ocultarlo a veces
  depositLabel = input<string>('Depositar');
}