import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { SimplePokemon } from '../models/simple-pokemon.interface';
import { map, Observable } from 'rxjs';
import { PokeAPIResponse } from '../models/pokemon-api.response';
import { Pokemon } from '../models/pokemon.interface';

@Service()
export class Pokemons {
    private http = inject(HttpClient)


    public loadPage(page:number): Observable<SimplePokemon[]> {
        if(page !== 0) {
            --page
        }

        page = Math.max(0, page)

        return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page* 20}`).pipe(
            map((response) => response.results.map((result) => ({
                name: result.name,
                id: result.url.split('/').at(-2) || '',
            })))
        );

    }

    public loadPokemon(name: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
    }

  
}
