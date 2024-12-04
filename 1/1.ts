import { EOL } from "node:os";

const data = await Deno.readTextFile("./input.txt");

function parseText(data: string): [number[], number[]] {
  return data.split(EOL)
    .filter(Boolean)
    .reduce((acc, line: string) => {
      const [a, b] = line.split(" ")
        .filter(Boolean)
        .map((num) => parseInt(num, 10)) as [number, number];
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    }, [[], []] as [number[], number[]]);
}

function task1(text: string): void {
  const parsedData = parseText(text);
  const a = parsedData[0].sort((a, b) => a - b);
  const b = parsedData[1].sort((a, b) => a - b);

  const answer = a.reduce((acc, num, i) => {
    return acc + Math.abs(num - b[i]);
  }, 0);

  console.log(answer);
}

function task2(text: string): void {
  const [aList, bList] = parseText(text);
  const tuples = aList.map((x) => [x, 0] as readonly [number, number]);
  const similarityMap = new Map<number, number>(tuples);

  for (const bValue of bList) {
    const count = similarityMap.get(bValue);
    if (count !== undefined) {
      similarityMap.set(bValue, count + 1);
    }
  }
  const answer = similarityMap.entries().reduce(
    (acc, [value, count]) => acc + value * count,
    0,
  );
  console.log(answer);
}
