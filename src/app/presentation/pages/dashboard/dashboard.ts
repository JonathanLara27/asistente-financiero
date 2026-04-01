import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TransactionState } from '../../../application/state/transaction.state';
import { BalanceCard } from './components/balance-card/balance-card';
import { DashboardHeader } from './components/dashboard-header/dashboard-header';
import { RecentActivity } from './components/recent-activity/recent-activity';

// 1. DICCIONARIO DE TEXTOS (Preparado para i18n futuro)
const DASHBOARD_UI = {
  greeting: 'Hola de nuevo,',
  userName: 'Vianet One', // A futuro esto vendría de un UserState
  balanceLabel: 'Saldo Total',
  growthBadge: '+12.5%',
  depositBtn: 'Depositar',
  recentActivityTitle: 'Actividad Reciente',
  viewAllBtn: 'Ver todo',
  emptyStateMsg: 'No hay transacciones recientes.'
};

// 2. RUTAS DE ÍCONOS (Guardados en public/icons/)
const ICONS = {
  user: '/icons/user.svg',
  bell: '/icons/bell.svg',
  income: '/icons/arrow-down-left.svg',
  expense: '/icons/arrow-up-right.svg'
};

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardHeader, BalanceCard, RecentActivity
  ],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard { 
  public ui = DASHBOARD_UI;
  public iconsHeader = signal({ user: ICONS.user, bell: ICONS.bell });
  public iconsActivity = signal({ income: ICONS.income, expense: ICONS.expense });


  public state = inject(TransactionState);

  ngOnInit() {
    // Al inicializar el componente, le pedimos al estado que cargue los datos del backend (simulado)
    // Esto actualizará los Signals automáticamente y la UI reaccionará
    this.state.loadTransactions();
  }

}
