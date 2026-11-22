import { Component, input } from '@angular/core';
import { SimplePokemon } from '../../models/simple-pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input.required<SimplePokemon>();
}
