import { CLICommand, State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string) {
  try {
    if (state.pokedex[pokemonName]) {
      const pokemon = state.pokedex[pokemonName];
      console.log(`Name: ${pokemon.name}`);
      console.log(`Height: ${pokemon.height}`);
      console.log(`Weight: ${pokemon.weight}`);
      console.log("Stats:");
      pokemon.stats.forEach((s) =>
        console.log(`  - ${s.stat.name}: ${s.base_stat}`),
      );
      console.log("Types:");
      pokemon.types.forEach((t) => console.log(`  - ${t.type.name}`));
    } else {
      console.log("you have not caught that pokemon");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unknown error:", err);
    }
  }
}
