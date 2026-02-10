import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  pokeCache = new Cache(60_000);
  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL ?? PokeAPI.baseURL + "/location-area";
    if(this.pokeCache.get(fullURL)){
        return await this.pokeCache.get(fullURL); 
    }

    const result = await fetch(fullURL);
    const locations = await result.json();
    this.pokeCache.add(fullURL,locations);
    if(!result.ok){
        throw new Error("Response was not ok!");
    }
    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = PokeAPI.baseURL + `/location-area/${locationName}`;
    if(this.pokeCache.get(fullURL)){
        return await this.pokeCache.get(fullURL); 
    }
    const result = await fetch(fullURL);
    const location = await result.json();
    this.pokeCache.add(fullURL,location);
    if(!result.ok){
        throw new Error("Response was not ok!");
    }
    return await location;
  }
}

export type ShallowLocations = {
    count: number;
    next?: string;
    previous?: string;
    results: {name:string,url:string}[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: {
    encounter_method:{
        name:string;
        url: string;
    };
    version_details:{
        rate: number;
        version:{
            name: string;
            url: string;
        };
    };
  };
  location:{
    name: string;
    url: string;
  };
  names:{
    name: string;
    langauge:{
        name: string;
        url: string;
    };
  }[];
  pokemon_encounters:{
    pokemon: {
        name: string;
        url: string;
    };
    version_details:{
        version:{
            name: string;
            url: string;
        };
        max_chance: number;
        encounter_details:{
            min_level: number;
            max_level: number;
            condition_values:{
                name: string;
                url: string;
            }[];
            chance: number;
            method: {
                name: string;
                url: string;
            }
        }[];
    }
  }[];
};