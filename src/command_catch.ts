import { CLICommand, State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
  try {
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    const catchRate = 1 - (pokemon.base_experience - 28) / (600 - 28);
    const roll = Math.random(); // 0 → 1
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    if (roll < catchRate) {
      console.log(`${pokemonName} was caught!`);
    } else {
      console.log(`${pokemonName} escaped!`);
    }
    state.pokedex[pokemonName] = pokemon;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unknown error:", err);
    }
  }
}
