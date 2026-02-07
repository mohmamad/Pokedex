export function cleanInput(input: string): string[] {
  const cleanedText = input.trim().toLowerCase().replace(/\s+/g," ").split(" ").filter(Boolean);
  for(const text in cleanedText){
    if(text === " "){
        cleanedText.splice(cleanedText.indexOf(text));
    }
  }
  return cleanedText;
}