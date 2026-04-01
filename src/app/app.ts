import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TransactionState } from './application/state/transaction.state';
import { BottomNav, TabType } from './presentation/shared/bottom-nav/botton-nav';
import { TransactionSheet } from './presentation/shared/transaction-sheet/transaction-sheet';
// Ajusta la ruta de importación según dónde guardaste exactamente el componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BottomNav,
    TransactionSheet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  // Inyectamos el estado global para poder guardar la transacción
  private transactionState = inject(TransactionState);

  // Signal para controlar si el Bottom Sheet está abierto o cerrado
  public isSheetOpen = signal<boolean>(false);

  onTabChange(tab: TabType) {
    this.router.navigate([`/${tab}`]);
  }

  openTransactionModal() {
    // Cuando el usuario hace clic en el botón '+' del nav, cambiamos el signal a true
    this.isSheetOpen.set(true);
  }

  saveTransaction(newTx: any) {
    // Llamamos al caso de uso de nuestro estado global
    // Esto guardará en la "BD", actualizará los signals y recalculará el Saldo Total automáticamente
    this.transactionState.addTransaction(newTx);
  }
}