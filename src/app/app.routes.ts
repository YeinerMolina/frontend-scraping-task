import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.page').then((resp) => resp.HomePage),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./features/book-detail/book-detail.page').then(
        (resp) => resp.BookDetailPage
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
