import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  imports: [],
  templateUrl: './dashboard-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeader {

  userName = input.required<string>(); // Obligamos a que le pasen el nombre
  greeting = input<string>('Hola de nuevo,'); // Valor por defecto

  icons = input.required<{ user: string; bell: string }>(); // También podríamos tipar cada icono por separado

 }
