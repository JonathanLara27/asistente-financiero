import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionDTO } from '../dtos/transaction.dto';

export class TransactionMapper {
    static fromDTO(dto: TransactionDTO): TransactionEntity {
        return {
            id: dto.id_tx,
            concept: dto.description,
            amount: dto.total_amount,
            date: dto.tx_date,
            category: dto.category_name,
            type: dto.tx_type,
            cardId: dto.card_reference,
            isTaxDeductible: dto.tax_deductible,
            ruc: dto.tax_ruc
        };
    }
}