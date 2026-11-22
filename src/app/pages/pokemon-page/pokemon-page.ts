import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
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
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemonId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  public pokemonResource = rxResource({
    params: () => this.pokemonId(),
    stream: ({ params: id }) =>
      this.pokemonService.loadPokemon(id).pipe(
        tap((pokemon) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

          this.title.setTitle(`Pokemon: ${pokemon.name}`);
          this.meta.updateTag({
            name: 'description',
            content: `Página del pokemon ${pokemon.name}`,
          });
          this.meta.updateTag({
            name: 'keywords',
            content: `${pokemon.name}, pokemon, pokedex`,
          });
          this.meta.updateTag({
            property: 'og:title',
            content: `Pokemon: ${pokemon.name}`,
          });
          this.meta.updateTag({
            property: 'og:image',
            content: imageUrl,
          });
        }),
      ),
  });
}
