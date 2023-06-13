import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://api.pokemontcg.io/v1';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cards`);
  }

  //Préparation inside service
  getAllDirectly(): Observable<Pokemon[]> {
    return this.http.get<any>(`${this.baseUrl}/cards`).pipe(
      map((data) => {
        return data.cards.map(
          (
            pokemon: Pick<
              Pokemon,
              'id' | 'name' | 'nationalPokedexNumber' | 'imageUrl'
            >
          ) => {
            return new Pokemon(
              pokemon.id,
              pokemon.name,
              pokemon.nationalPokedexNumber,
              pokemon.imageUrl
            );
          }
        );
      })
    );
  }
}
