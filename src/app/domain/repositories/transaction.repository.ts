import { TransactionEntity } from '../entities/transaction.entity';

export abstract class TransactionRepository {
    abstract getAll(): Promise<TransactionEntity[]>;
    abstract save(transaction: Omit<TransactionEntity, 'id'>): Promise<TransactionEntity>;
    abstract delete(id: string): Promise<void>;
}