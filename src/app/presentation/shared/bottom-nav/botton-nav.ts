import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export type TabType = 'dashboard' | 'cards' | 'taxes' | 'profile';

interface NavItem {
  id: TabType | 'fab';
  label?: string;
  isFab?: boolean;
  iconPath: string;
  route?: string; // Usamos la ruta directa
}

@Component({
  selector: 'app-bottom-nav',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './bottom-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNav {

  private router = inject(Router);

  activeTab = signal<TabType>('dashboard');
  tabChange = output<TabType>();
  addClick = output<void>();

  // Arreglo de configuración que dicta el orden en la vista
  tabs = signal<NavItem[]>([
    { id: 'dashboard', label: 'Inicio', iconPath: '/icons/inicio.svg', route: '/dashboard' },
    { id: 'cards', label: 'Tarjetas', iconPath: '/icons/tarjetas.svg', route: '/cards' },
    { id: 'fab', isFab: true, iconPath: '/icons/fab-add.svg' },
    { id: 'taxes', label: 'SUNAT', iconPath: '/icons/sunat.svg', route: '/taxes' },
    { id: 'profile', label: 'Perfil', iconPath: '/icons/perfil.svg', route: '/profile' }
  ]);

  handleItemClick(item: NavItem) {
    if (item.isFab) {
      this.addClick.emit();
    } else {
      this.tabChange.emit(item.id as TabType);
    }
  }

 }
