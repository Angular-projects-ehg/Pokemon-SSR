import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonList } from '../../features/pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../features/pokemons/services/pokemons';
import { SimplePokemon } from '../../features/pokemons/models/simple-pokemon.interface';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
})
export default class PokemonsPage {
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
    { initialValue: 1 },
  );

  public pokemonsResource = rxResource({
    params: () => this.currentPage(),
    stream: ({ params: page }) =>
      this.pokemonService.loadPage(page).pipe(
        tap((pokemons: SimplePokemon[]) => {
          this.pokemons.set(pokemons);
        }),
      ),
  });
}
