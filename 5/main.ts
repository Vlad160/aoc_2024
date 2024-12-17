import { EOL } from "node:os";

const data = await Deno.readTextFile("./input.txt");

function parseText(
  data: string,
): { rules: Record<number, number[]>; sequences: number[][] } {
  const strings = data.split(EOL);
  const rules: Record<number, number[]> = {};
  const sequences: number[][] = [];
  let rulesParsed = false;
  for (const line of strings) {
    const str = line.trim();
    if (str === "") {
      if (!rulesParsed) {
        rulesParsed = true;
      } else {
        continue;
      }
    }

    if (!rulesParsed) {
      const numbers = str.split("|");
      const n1 = Number.parseInt(numbers[0]);
      const n2 = Number.parseInt(numbers[1]);
      let seq = rules[n1];
      if (!seq) {
        seq = [];
        rules[n1] = seq;
      }
      seq.push(n2);
    } else {
      sequences.push(str.split(",").map((c) => Number.parseInt(c)));
    }
  }
  return {
    rules: rules,
    sequences: sequences,
  };
}

function isSequenceValid(
  sequence: number[],
  rules: Record<number, number[]>,
): boolean {
  for (let i = 0; i < sequence.length; i++) {
    const num1 = sequence[i];
    const r = rules[num1];
    if (!r) {
      continue;
    }
    for (let j = i; j >= 0; j--) {
      const num2 = sequence[j];
      if (r.includes(num2)) {
        return false;
      }
    }
  }
  return true;
}

function task1(text: string) {
  const data = parseText(text);
  let result = 0;

  for (const sequence of data.sequences) {
    const isValid = isSequenceValid(sequence, data.rules);
    if (isValid) {
      result += sequence.at(sequence.length / 2) || 0;
    }
  }
  return result;
}

function fixSequence(
  sequence: number[],
  rules: Record<number, number[]>,
): number[] {
  return sequence.slice()
    .sort((a, b) => {
      const r = rules[a] || [];
      return r.includes(b) ? 1 : -1;
    });
}

function task2(text: string) {
  const data = parseText(text);
  let result = 0;

  for (const sequence of data.sequences) {
    const isValid = isSequenceValid(sequence, data.rules);
    if (!isValid) {
      const newSequence = fixSequence(sequence, data.rules);
      result += newSequence.at(newSequence.length / 2) || 0;
    }
  }
  return result;
}

console.log(task1(data));
console.log(task2(data));
