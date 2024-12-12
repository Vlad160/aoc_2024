import { EOL } from "node:os";

const data = await Deno.readTextFile("./input.txt");

function parseText(data: string): string[] {
  return data.split(EOL);
}

const XMAS = "XMAS";

function checkDir2(
  data: string[],
  i: number,
  j: number,
  delta: { x: number; y: number },
  lookup: string,
): number {
  let c = 0;
  let count = 0;
  let result = true;
  const len = lookup.length;
  let cI = i;
  let cJ = j;
  while (c < len) {
    const char = lookup[c];
    const dataChar = data[cI]?.[cJ];
    if (!dataChar || dataChar !== char) {
      result = false;
      break;
    }
    cI += delta.y;
    cJ += delta.x;
    c++;
  }
  if (result) {
    count++;
  }
  c = 0;
  result = true;
  cI = i;
  cJ = j;
  const pukool = lookup.split("").reverse().join("");

  while (c < len) {
    const char = pukool[c];
    const dataChar = data[cI]?.[cJ];
    if (!dataChar || dataChar !== char) {
      result = false;
      break;
    }
    cI += delta.y;
    cJ += delta.x;
    c++;
  }
  if (result) {
    count++;
  }
  return count;
}

function checkDir1(
  data: string[],
  i: number,
  j: number,
  delta: { x: number; y: number },
  lookup: string,
): number {
  let count = 0;
  const len = lookup.length;
  let cI = i;
  let cJ = j;

  for (let c = 0; c < len; c++) {
    const char = lookup[c];
    const dataChar = data[cI]?.[cJ];
    if (!dataChar || dataChar !== char) {
      return 0;
    }
    cI += delta.y;
    cJ += delta.x;
  }
  count++;

  cI = i;
  cJ = j;
  for (let c = 0; c < len; c++) {
    const char = lookup[len - 1 - c];
    const dataChar = data[cI]?.[cJ];
    if (!dataChar || dataChar !== char) {
      return count;
    }
    cI += delta.y;
    cJ += delta.x;
  }
  count++;

  return count;
}

function task1(text: string): number {
  const data = parseText(text);
  let count = 0;

  const directions = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      for (const delta of directions) {
        count += checkDir1(data, i, j, delta, XMAS);
      }
    }
  }
  return count;
}

function task2(text: string): number {
  const data = parseText(text);
  let count = 0;
  function check(i: number, j: number, delta: { x: number; y: number }) {
    return checkDir2(data, i, j, delta, "MAS");
  }
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      let c = 0;
      c += check(i, j, { x: 1, y: 1 });
      c += check(i, j + 2, { x: -1, y: 1 });
      if (c >= 2) {
        count++;
      }
    }
  }
  return count;
}

console.log(task1(data));
console.log(task2(data));
