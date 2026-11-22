import { Component, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../features/pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
})
export default class PokemonsPage implements OnInit {
  public isLoading = signal(true)

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false)
    }, 3000)
  }
}
