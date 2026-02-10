import { CLICommand, State } from "./state.js";

export async function commandMapb(state: State){
    if(state.prevLocationsURL === undefined || state.prevLocationsURL === null){
        console.log("you're on the first page");
        return;
    }
    try{
        const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
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