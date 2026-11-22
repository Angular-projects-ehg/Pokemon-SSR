import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Pokemons } from '../../features/pokemons/services/pokemons';

@Component({
  selector: 'app-pokemon-page',
  imports: [RouterLink],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.css',
})
export default class PokemonPage {
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);

  public pokemonId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  public pokemonResource = rxResource({
    params: () => this.pokemonId(),
    stream: ({ params: id }) => this.pokemonService.loadPokemon(id),
  });
}
