import { Injectable } from '@angular/core';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionDTO } from '../dtos/transaction.dto';
import { TransactionMapper } from '../mappers/transaction.mapper';

@Injectable({
    providedIn: 'root'
})
export class LocalTransactionService implements TransactionRepository {

    private mockDatabase: TransactionDTO[] = [
        { id_tx: '1', description: 'Almuerzo Central', total_amount: 450.00, tx_date: '2026-03-28', category_name: 'Restaurantes', tx_type: 'expense' },
        { id_tx: '2', description: 'Pago de Nómina', total_amount: 8500.00, tx_date: '2026-03-30', category_name: 'Ingresos', tx_type: 'income' }
    ];

    async getAll(): Promise<TransactionEntity[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                const domainTransactions = this.mockDatabase.map(dto => TransactionMapper.fromDTO(dto));
                resolve(domainTransactions);
            }, 500);
        });
    }

    async save(transaction: Omit<TransactionEntity, 'id'>): Promise<TransactionEntity> {
        return new Promise(resolve => {
            setTimeout(() => {
                const newTx: TransactionEntity = { ...transaction, id: Math.random().toString(36).substring(2, 9) };
                resolve(newTx);
            }, 300);
        });
    }

    async delete(id: string): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, 200));
    }
}