import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";
describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
   {
    input: "  Pikachu  ",
    expected: ["pikachu"],
  },
  {
    input: "Bulbasaur     Charmander",
    expected: ["bulbasaur", "charmander"],
  },
  {
    input: "SqUiRtLe",
    expected: ["squirtle"],
  },
  {
    input: "   Eevee     Snorlax   Mewtwo  ",
    expected: ["eevee", "snorlax", "mewtwo"],
  },
  {
    input: "Pidgey\t\tRattata\nZubat",
    expected: ["pidgey", "rattata", "zubat"],
  },
  {
    input: "     ",
    expected: [],
  },
  {
    input: "Gengar",
    expected: ["gengar"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
    