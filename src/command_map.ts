import { CLICommand, State } from "./state.js";

export async function commandMap(state: State){
    try{
        const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
        locations.results.forEach(r => console.log(r.name));
    }catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }else{
            console.log("Unknown error:", err);
        }
    }
}