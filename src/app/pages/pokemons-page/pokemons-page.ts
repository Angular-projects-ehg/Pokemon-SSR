import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonList } from '../../features/pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../features/pokemons/services/pokemons';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
})
export default class PokemonsPage {
  private pokemonService = inject(Pokemons);

  public currentPage = signal(0);

  public pokemonsResource = rxResource({
    params: () => this.currentPage(),
    stream: ({ params: page }) => this.pokemonService.loadPage(page),
  });
}
