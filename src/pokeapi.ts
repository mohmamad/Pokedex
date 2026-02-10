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

  async fetchPokemon(pokemonName: string): Promise<Pokemon>{
    const fullURL = PokeAPI.baseURL + `/pokemon/${pokemonName}`;
    if(this.pokeCache.get(fullURL)){
        return await this.pokeCache.get(fullURL); 
    }
    const result = await fetch(fullURL);
    const pokemon = await result.json();
    this.pokeCache.add(fullURL,pokemon);
    if(!result.ok){
        throw new Error("Response was not ok!");
    }
    return await pokemon;
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

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;

  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];

  forms: {
    name: string;
    url: string;
  }[];

  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];

  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      version: {
        name: string;
        url: string;
      };
      rarity: number;
    }[];
  }[];

  location_area_encounters: string;

  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
      level_learned_at: number;
      order: number;
    }[];
  }[];

  past_types: {
    generation: {
      name: string;
      url: string;
    };
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
  }[];

  past_abilities: {
    generation: {
      name: string;
      url: string;
    };
    abilities: {
      is_hidden: boolean;
      slot: number;
      ability: {
        name: string;
        url: string;
      };
    }[];
  }[];

  past_stats: {
    generation: {
      name: string;
      url: string;
    };
    stats: {
      stat: {
        name: string;
        url: string;
      };
      effort: number;
      base_stat: number;
    }[];
  }[];

  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
  };

  cries: {
    latest: string;
    legacy: string;
  };

  species: {
    name: string;
    url: string;
  };

  stats: {
    stat: {
      name: string;
      url: string;
    };
    effort: number;
    base_stat: number;
  }[];

  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};
