import { EOL } from "node:os";

const data = await Deno.readTextFile("./input.txt");

function parseText(text: string): [number, number[]][] {
  const lines = text.split(EOL).filter(Boolean);
  const result: [number, number[]][] = [];
  for (const line of lines) {
    const [p1, p2] = line.split(":");
    result.push([
      Number.parseInt(p1),
      p2.split(" ")
        .filter((c) => c.trim() !== "")
        .map((n) => Number.parseInt(n)),
    ]);
  }
  return result;
}

function evaluateChunk(expected: number, numbers: number[]): boolean {
  const a = numbers[0] * numbers[1];
  const b = numbers[0] + numbers[1];

  if (numbers.length === 2) {
    return a === expected || b === expected;
  }
  return evaluateChunk(expected, [a, ...numbers.slice(2)]) ||
    evaluateChunk(expected, [b, ...numbers.slice(2)]);
}

function evaluateChunk2(expected: number, numbers: number[]): boolean {
  const a = numbers[0] * numbers[1];
  const b = numbers[0] + numbers[1];
  const c = Number.parseInt(`${numbers[0]}${numbers[1]}`);

  if (numbers.length === 2) {
    return a === expected || b === expected || c === expected;
  }
  return evaluateChunk2(expected, [a, ...numbers.slice(2)]) ||
    evaluateChunk2(expected, [b, ...numbers.slice(2)]) ||
    evaluateChunk2(expected, [c, ...numbers.slice(2)]);
}

function task1(text: string): number {
  const data = parseText(text);
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    const chunk = data[i];
    const res = evaluateChunk(chunk[0], chunk[1]);
    if (res) {
      result += chunk[0];
    }
  }
  return result;
}

function task2(text: string): number {
  const data = parseText(text);
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    const chunk = data[i];
    const res = evaluateChunk2(chunk[0], chunk[1]);
    if (res) {
      result += chunk[0];
    }
  }
  return result;
}

console.log(task1(data));
console.log(task2(data));
