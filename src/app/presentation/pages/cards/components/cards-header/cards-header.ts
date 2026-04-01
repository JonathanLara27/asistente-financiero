import { ChangeDetectionStrategy, Component, output, input } from '@angular/core';

@Component({
  selector: 'app-cards-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">{{ title() }}</h2>
      
      <button (click)="onAddClick.emit()" 
              class="p-2 bg-[#121212] rounded-full border border-white/5 hover:bg-[#1a1a1a] active:scale-95 transition-all group">
        <div class="w-6 h-6 bg-[#a3ff33] group-hover:scale-110 transition-transform"
             style="-webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center; -webkit-mask-image: url('/icons/plus.svg'); mask-image: url('/icons/fab-add.svg');">
        </div>
      </button>
    </header>
  `
})
export class CardsHeader {
  // Inputs por si queremos reutilizarlo con otro título
  title = input<string>('Mis Tarjetas');

  // Evento para avisar al padre que abra el sheet
  onAddClick = output<void>();
}