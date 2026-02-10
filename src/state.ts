import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type Pokedex = Record<string, Pokemon>;
export type State = {
    commands: Record<string, CLICommand>;
    rl: Interface;
    pokeapi: PokeAPI;
    nextLocationsURL?: string;
    prevLocationsURL?: string;
    pokedex: Pokedex;
}

export function initState() : State{
    return {
        commands: getCommands(),
        rl: createInterface({
                input: process.stdin,
                output: process.stdout
            }),
        pokeapi: new PokeAPI,
        pokedex: {},
    };
}