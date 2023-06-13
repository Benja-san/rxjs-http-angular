import { Component } from '@angular/core';
import { Pokemon } from './models/pokemon/pokemon';
import { PokemonService } from './services/pokemon/pokemon.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pokemons: Pokemon[] = [];

  pokemons$: Observable<Pokemon[]> = of([]);

  title = 'atelier-pokemon';
  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    //Imperative way
    this.pokemonService.getAll().subscribe((pokemons) => {
      pokemons.cards.map(
        (
          pokemon: Pick<
            Pokemon,
            'id' | 'name' | 'nationalPokedexNumber' | 'imageUrl'
          >
        ) => {
          this.pokemons.push(
            new Pokemon(
              pokemon.id,
              pokemon.name,
              pokemon.nationalPokedexNumber,
              pokemon.imageUrl
            )
          );
        }
      );
    });

    //Reactive / functional way
    this.pokemons$ = this.pokemonService.getAllDirectly();
  }
}
