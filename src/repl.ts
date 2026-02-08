import readline from "readline";

export function cleanInput(input: string): string[] {
  const cleanedText = input.trim().toLowerCase().replace(/\s+/g," ").split(" ").filter(Boolean);
  for(const text in cleanedText){
    if(text === " "){
        cleanedText.splice(cleanedText.indexOf(text));
    }
  }
  return cleanedText;
}

export function startREPL(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt("Pokedex > ");

    rl.prompt();

    rl.on("line" , (input: string) => {
      const words = cleanInput(input);

      if(words.length === 0) console.log("Your command was: ");
      else console.log(`Your command was: ${words[0]}`);

      rl.prompt();
    })

    rl.on("close", () => {
      process.exit(0);
    });

}