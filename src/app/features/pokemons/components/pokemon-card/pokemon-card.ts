import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimplePokemon } from '../../models/simple-pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input.required<SimplePokemon>();
}
