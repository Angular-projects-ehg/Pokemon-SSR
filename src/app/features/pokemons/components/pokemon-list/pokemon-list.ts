import { Component, input, output } from '@angular/core';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { SimplePokemon } from '../../models/simple-pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  pokemons = input.required<SimplePokemon[]>();
  previousPage = output();
  nextPage = output();
}
