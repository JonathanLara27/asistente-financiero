import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./presentation/pages/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'cards',
        loadComponent: () => import('./presentation/pages/cards/cards').then(m => m.Cards)
    },
    {
        path: 'taxes',
        loadComponent: () => import('./presentation/pages/taxes/taxes').then(m => m.Taxes)
    },
    {
        path: 'profile',
        loadComponent: () => import('./presentation/pages/profile/profile').then(m => m.Profile)
    },
    {
        // Ruta comodín por si el usuario escribe una URL que no existe
        path: '**',
        redirectTo: 'dashboard'
    }
];