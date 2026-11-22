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

  public pokemonName = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('name') ?? '')),
    { initialValue: '' },
  );

  public pokemonResource = rxResource({
    params: () => this.pokemonName(),
    stream: ({ params: name }) =>
      this.pokemonService.loadPokemon(name).pipe(
        tap((pokemon) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

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
            property: 'og:description',
            content: `Página del pokemon ${pokemon.name}`,
          });
          this.meta.updateTag({
            property: 'og:image',
            content: imageUrl,
          });
          this.meta.updateTag({
            property: 'og:image:type',
            content: 'image/png',
          });
          this.meta.updateTag({
            name: 'twitter:card',
            content: 'summary_large_image',
          });
          this.meta.updateTag({
            name: 'twitter:image',
            content: imageUrl,
          });
        }),
      ),
  });
}
