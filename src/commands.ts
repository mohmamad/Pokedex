import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays 20 locations each time",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations each time",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Displays the pokemon in the given area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Throws a pokeball at a pokemon to catch it",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspects the status of a caught pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Shows the names the player caught",
      callback: commandPokedex,
    },
  };
}
