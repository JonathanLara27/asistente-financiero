import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { LocalTransactionService } from './infrastructure/api/local-transaction.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    {
      provide: TransactionRepository,
      useClass: LocalTransactionService
    }
  ]
};
