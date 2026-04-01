import { required, min, max, pattern, minLength, maxLength, SchemaPathTree } from '@angular/forms/signals';
import { CardBrand } from '../../../domain/entities/card.entity';

export interface CardCreate {
    lastFour: string;
    limit: number | null;
    closingDay: number | null;
    paymentDay: number | null;
    type: CardBrand;
}

export const CARD_INIT: CardCreate = {
    lastFour: '',
    limit: null,
    closingDay: null,
    paymentDay: null,
    type: 'visa'
};

export const cardValidationSchema = (schemaPath: SchemaPathTree<CardCreate>) => {
    required(schemaPath.lastFour, { message: 'Requerido' });
    pattern(schemaPath.lastFour, /^\d{4}$/, { message: 'Debe tener exactamente 4 números' });

    required(schemaPath.limit, { message: 'El límite es obligatorio' });
    min(schemaPath.limit, 1, { message: 'Debe ser mayor a 0' });

    required(schemaPath.closingDay, { message: 'Requerido' });
    min(schemaPath.closingDay, 1, { message: 'Mínimo día 1' });
    max(schemaPath.closingDay, 31, { message: 'Máximo día 31' });

    required(schemaPath.paymentDay, { message: 'Requerido' });
    min(schemaPath.paymentDay, 1, { message: 'Mínimo día 1' });
    max(schemaPath.paymentDay, 31, { message: 'Máximo día 31' });
};