import { Injectable, signal, computed, inject } from '@angular/core';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable({
    providedIn: 'root'
})
export class TransactionState {
    private repository = inject(TransactionRepository);

    // --- ESTADO ---
    private transactionsSignal = signal<TransactionEntity[]>([]);
    public isLoading = signal<boolean>(false);
    public error = signal<string | null>(null);

    public readonly transactions = this.transactionsSignal.asReadonly();

    // --- COMPUTED ---
    public readonly totalBalance = computed(() => {
        return this.transactionsSignal().reduce((sum, tx) =>
            tx.type === 'income' ? sum + tx.amount : sum - tx.amount, 0
        );
    });

    public readonly accumulatedExpenses = computed(() => {
        return this.transactionsSignal()
            .filter(tx => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0);
    });

    // --- ACCIONES ---
    async loadTransactions() {
        this.isLoading.set(true);
        try {
            const data = await this.repository.getAll();
            this.transactionsSignal.set(data);
        } catch (err) {
            this.error.set('Error al cargar transacciones');
        } finally {
            this.isLoading.set(false);
        }
    }

    async addTransaction(tx: Omit<TransactionEntity, 'id'>) {
        try {
            const newTx = await this.repository.save(tx);
            this.transactionsSignal.update(current => [newTx, ...current]);
        } catch (err) {
            this.error.set('Error al guardar transacción');
        }
    }

    async removeTransaction(id: string) {
        try {
            await this.repository.delete(id);
            this.transactionsSignal.update(current => current.filter(tx => tx.id !== id));
        } catch (err) {
            this.error.set('Error al eliminar transacción');
        }
    }
}