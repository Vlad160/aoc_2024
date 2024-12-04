import { EOL } from "node:os";

const data = await Deno.readTextFile("./input.txt");

function parseText(data: string): number[][] {
  return data.split(EOL)
    .filter(Boolean)
    .map((line) => line.split(" ").map((num) => parseInt(num, 10)));
}

function isSequenceValid(line: number[]): boolean {
  const sign = Math.sign(line[0] - line[1]);

  if (sign === 0) {
    return false;
  }

  for (let i = 0; i < line.length - 1; i++) {
    const diff = line[i] - line[i + 1];

    if (Math.sign(diff) !== sign) {
      return false;
    }
    if (Math.abs(diff) > 3) {
      return false;
    }
  }

  return true;
}

function isSequenceValid2(line: number[]): boolean {
  if (isSequenceValid(line)) {
    return true;
  }

  for (let i = 0; i < line.length; i++) {
    const newSequence = line.slice(0, i).concat(line.slice(i + 1));
    if (isSequenceValid(newSequence)) {
      return true;
    }
  }

  return false;
}

function task1(text: string): void {
  const data = parseText(text);

  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const isValid = isSequenceValid(data[i]);
    if (isValid) {
      count++;
    }
  }

  console.log(count);
}

function task2(text: string): void {
  const data = parseText(text);

  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const isValid = isSequenceValid2(data[i]);
    if (isValid) {
      count++;
    }
  }

  console.log(count);
}

task2(data);
