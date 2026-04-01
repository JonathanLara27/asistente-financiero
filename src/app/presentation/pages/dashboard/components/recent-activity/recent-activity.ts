import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe, SlicePipe, NgClass } from '@angular/common';
import { TransactionEntity } from '../../../../../domain/entities/transaction.entity';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, NgClass],
  templateUrl: './recent-activity.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentActivity {
  // Datos principales
  transactions = input.required<TransactionEntity[]>();

  // Iconos
  iconsActivity = input.required<{ income: string; expense: string }>();


  // Configuración opcional con valores por defecto
  limit = input<number>(4);
  title = input<string>('Actividad Reciente');
  viewAllLabel = input<string>('Ver todo');
  emptyMessage = input<string>('No hay transacciones recientes.');
}