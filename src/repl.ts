import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  const cleanedText = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean);
  return cleanedText;
}

export async function startREPL() {
  const state = initState();
  const rl = state.rl;
  rl.setPrompt("Pokedex > ");

  rl.prompt();

  rl.on("line", async (input: string) => {
    const words = cleanInput(input);
    const command = state.commands[words[0]];
    if (command) {
      try {
        if (words.length > 1) {
          await command.callback(state, words[1]);
        } else {
          await command.callback(state);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Unknown error:", err);
        }
      }
    } else {
      console.log("Unknown command!");
    }

    rl.prompt();
  });

  rl.on("close", () => {
    process.exit(0);
  });
}
