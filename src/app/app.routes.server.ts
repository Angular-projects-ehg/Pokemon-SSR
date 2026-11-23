import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

const routesFile = readFileSync(join(process.cwd(), 'routes.txt'), 'utf8');

const prerenderRoutes = routesFile
  .split(/\r?\n/)
  .map((route) => route.trim())
  .filter(Boolean);

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return prerenderRoutes
        .filter((route) => route.startsWith('/pokemons/page/'))
        .map((route) => ({
          page: route.replace('/pokemons/page/', ''),
        }));
    },
  },
  {
    path: 'pokemons/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return prerenderRoutes
        .filter(
          (route) =>
            route.startsWith('/pokemons/') && !route.startsWith('/pokemons/page/'),
        )
        .map((route) => ({
          name: route.replace('/pokemons/', ''),
        }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
