import { EOL } from "node:os";

const data = await Deno.readTextFile("./input.txt");

const dirs = ["^", ">", "<", "v"];

enum Direction {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}

const CHAR_TO_DIRECTION = {
  "^": Direction.UP,
  ">": Direction.RIGHT,
  "<": Direction.LEFT,
  "v": Direction.DOWN,
};

const ROTATE_DIRECTION = {
  [Direction.LEFT]: Direction.UP,
  [Direction.UP]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.DOWN,
  [Direction.DOWN]: Direction.LEFT,
};

const MOVE_DELTA = {
  [Direction.UP]: [-1, 0],
  [Direction.DOWN]: [1, 0],
  [Direction.RIGHT]: [0, 1],
  [Direction.LEFT]: [0, -1],
};

function parseText(text: string) {
  const lines = text.split(EOL).map((line) => line.split(""));
  const startingPosition = [0, 0];
  let startingDir = Direction.UP;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (dirs.includes(char)) {
        startingPosition[0] = i;
        startingPosition[1] = j;
        startingDir = CHAR_TO_DIRECTION[char as "^" | ">" | "<" | "v"];
        lines[i][j] = ".";
      }
    }
  }
  return {
    map: lines,
    startingPosition: startingPosition,
    startingDir: startingDir,
  };
}

function task1(text: string): number {
  const { map, startingDir, startingPosition } = parseText(text);
  const positions = new Set<string>();
  const position = startingPosition.slice();
  let direction = startingDir;
  while (true) {
    const char = map[position[0]]?.[position[1]];
    if (char === undefined) {
      break;
    }
    const delta = MOVE_DELTA[direction];
    if (char === "#") {
      direction = ROTATE_DIRECTION[direction];
      position[0] -= delta[0];
      position[1] -= delta[1];
    } else if (char === ".") {
      positions.add(position.join("-"));
      position[0] += delta[0];
      position[1] += delta[1];
    } else {
      throw new Error(`Unknown char ${char} at position ${position}`);
    }
  }
  return positions.size;
}
const positionToString = (position: number[]) => position.join("-");

function navigate(
  map: string[][],
  startingDir: Direction,
  startingPosition: [number, number],
) {
  const positions = new Set<string>();
  const stops = new Map<string, string[]>();
  const position = startingPosition.slice();
  let direction = startingDir;
  while (true) {
    const char = map[position[0]]?.[position[1]];
    if (char === undefined) {
      return {
        loop: false,
      };
    }
    const delta = MOVE_DELTA[direction];
    if (char === "#") {
      position[0] -= delta[0];
      position[1] -= delta[1];
      const positionAsString = positionToString(position);
      let positionStops = stops.get(positionAsString);
      if (!positionStops)  {
        positionStops = [];
        stops.set(positionAsString, positionStops);
      }
      if (positionStops.includes(direction)) {
        return {
          loop: true
        }
      } else {
        positionStops.push(direction);
      }
      direction = ROTATE_DIRECTION[direction];
    } else if (char === ".") {
      const sPos = position.join("-");
      positions.add(sPos);
      position[0] += delta[0];
      position[1] += delta[1];
    } else {
      throw new Error(`Unknown char ${char} at position ${position}`);
    }
  }
}

function task2(text: string): number {
  const { map, startingDir, startingPosition } = parseText(text);
  let loops = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (i === startingPosition[0] && j === startingPosition[1]) {
        continue;
      }
      const mapClone = JSON.parse(JSON.stringify(map)) as string[][];
      mapClone[i][j] = "#";
      const { loop } = navigate(
        mapClone,
        startingDir,
        startingPosition.slice() as [number, number],
      );
      if (loop) {
        loops++;
      }
    }
  }
  return loops;
}

console.log(task1(data));
console.log(task2(data));
