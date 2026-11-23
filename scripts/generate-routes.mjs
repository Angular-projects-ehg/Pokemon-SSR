import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const pageSize = 20;

const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');

if (!response.ok) {
  throw new Error(`No se pudo consultar PokeAPI: ${response.status}`);
}

const data = await response.json();
const totalPages = Math.ceil(data.count / pageSize);

const routes = [
  '/about',
  '/pricing',
  '/contact',
  ...Array.from({ length: totalPages }, (_, index) => `/pokemons/page/${index + 1}`),
];

writeFileSync(join(rootDir, 'routes.txt'), `${routes.join('\n')}\n`, 'utf8');

console.log(
  `routes.txt generado: ${routes.length} rutas (${totalPages} paginas de pokemons)`,
);
