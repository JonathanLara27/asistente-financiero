export type SemaphoreColor = 'green' | 'yellow' | 'red';

export interface SemaphoreStatus {
    color: SemaphoreColor;
    text: string;
    twClass: string; // Clase de Tailwind para pintar el puntito
}

/**
 * Calcula el estado del semáforo de compras de una tarjeta de crédito.
 * Reglas de negocio:
 * - VERDE: Excelente momento para comprar (justo después del corte).
 * - AMARILLO: Faltan 5 o menos días para el corte (precaución).
 * - ROJO: Ya pasó el corte, estás en periodo de pago.
 */
export function calculateSemaphoreStatus(
    closingDay: number,
    paymentDay: number,
    currentDate: Date = new Date()
): SemaphoreStatus {
    const currentDay = currentDate.getDate();

    // 1. Caso ROJO: Entre el día de corte y el día de pago 
    // (Manejamos el caso donde el corte es a fin de mes y el pago a inicios del siguiente)
    const isAfterClosing = currentDay > closingDay;
    const isBeforePayment = currentDay <= paymentDay;

    if ((closingDay < paymentDay && currentDay > closingDay && currentDay <= paymentDay) ||
        (closingDay > paymentDay && (isAfterClosing || isBeforePayment))) {
        return {
            color: 'red',
            text: 'Evita comprar, periodo de facturación.',
            twClass: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]'
        };
    }

    // 2. Caso AMARILLO: 5 días antes de la fecha de corte
    // Calculamos cuántos días faltan para el corte
    let daysToClose = closingDay - currentDay;
    if (daysToClose < 0) {
        // Si ya pasó el corte este mes, calculamos para el próximo mes (aprox 30 días)
        daysToClose += 30;
    }

    if (daysToClose > 0 && daysToClose <= 5) {
        return {
            color: 'yellow',
            text: `Faltan ${daysToClose} días para el corte.`,
            twClass: 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]'
        };
    }

    // 3. Caso VERDE: El resto del tiempo
    return {
        color: 'green',
        text: 'Buen momento para realizar compras.',
        twClass: 'bg-[#a3ff33] shadow-[0_0_10px_rgba(163,255,51,0.8)]'
    };
}