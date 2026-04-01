import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModal { 

  isOpen = input.required<boolean>();
  title = input<string>('¿Estás seguro?');
  subtitle = input<string>('Esta acción no se puede deshacer.');

  onConfirm = output<void>();
  onCancel = output<void>();

}
