import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page'),
  },
  {
    path: 'pokemons',
    redirectTo: 'pokemons/page/1',
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons-page/pokemons-page'),
  },
  {
    path: 'pokemons/:name',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page'),
  },
  {
    path: '**',
    redirectTo: 'pokemons/page/1',
  },
];
