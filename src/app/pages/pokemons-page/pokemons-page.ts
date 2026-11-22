import { Component } from '@angular/core';
import { PokemonList } from '../../features/pokemons/components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
})
export default class PokemonsPage {}
