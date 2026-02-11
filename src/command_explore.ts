import { CLICommand, State } from "./state.js";

export async function commandExplore(state: State, location: string) {
  try {
    const locations = await state.pokeapi.fetchLocation(location);
    console.log(`Exploring ${location}...`);
    console.log("Found Pokemon:");
    locations.pokemon_encounters.forEach((p) => console.log(p.pokemon.name));
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unknown error:", err);
    }
  }
}
