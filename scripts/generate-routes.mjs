import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const pageSize = 20;

const countResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');

if (!countResponse.ok) {
  throw new Error(`No se pudo consultar PokeAPI: ${countResponse.status}`);
}

const countData = await countResponse.json();
const totalPages = Math.ceil(countData.count / pageSize);

const listResponse = await fetch(
  `https://pokeapi.co/api/v2/pokemon?limit=${countData.count}`,
);

if (!listResponse.ok) {
  throw new Error(`No se pudo listar pokemons: ${listResponse.status}`);
}

const listData = await listResponse.json();

const routes = [
  '/about',
  '/pricing',
  '/contact',
  ...Array.from({ length: totalPages }, (_, index) => `/pokemons/page/${index + 1}`),
  ...listData.results.map((pokemon) => `/pokemons/${pokemon.name}`),
];

writeFileSync(join(rootDir, 'routes.txt'), `${routes.join('\n')}\n`, 'utf8');

console.log(
  `routes.txt generado: ${routes.length} rutas (${totalPages} paginas, ${listData.results.length} pokemons)`,
);
