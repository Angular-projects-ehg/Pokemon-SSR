import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { SimplePokemon } from '../../models/simple-pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard, RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  pokemons = input.required<SimplePokemon[]>();
  currentPage = input.required<number>();
}
