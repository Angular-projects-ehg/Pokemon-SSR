import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { Pokemons } from './features/pokemons/services/pokemons';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const http = inject(HttpClient);
      const response = await firstValueFrom(
        http.get<{ count: number }>('https://pokeapi.co/api/v2/pokemon?limit=1'),
      );
      const totalPages = Math.ceil(response.count / 20);

      return Array.from({ length: totalPages }, (_, index) => ({
        page: String(index + 1),
      }));
    },
  },
  {
    path: 'pokemons/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonsService = inject(Pokemons);
      const pokemons = await firstValueFrom(pokemonsService.loadPage(1));

      return pokemons.map((pokemon) => ({ name: pokemon.name }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
