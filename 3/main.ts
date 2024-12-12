const data = await Deno.readTextFile("./input.txt");

function parseText(data: string): string {
  return data;
}

function readCommand(
  input: string,
  index: number,
  command: string,
): { index: number; value: string | null } {
  const readCommand = input.substring(index, index + command.length);
  const isEqual = readCommand === command;
  return {
    index: isEqual ? index + command.length : index,
    value: isEqual ? command : null,
  };
}

function readNumber(
  input: string,
  index: number,
): { index: number; value: number | null } {
  let count = 0;
  let num = "";
  while (count < 3) {
    const char = input[index];
    if (Number.isNaN(Number.parseInt(char, 10))) {
      return {
        value: count === 0 ? null : parseInt(num, 10),
        index: index,
      };
    } else {
      num += char;
      count++;
    }
    index += 1;
  }
  return {
    index: index,
    value: parseInt(num, 10),
  };
}

function readMul(
  input: string,
  index: number,
): { index: number; value: number | null; pair?: [number, number] } {
  const command = readCommand(input, index, "mul");

  if (command.value !== "mul") {
    return {
      index: index + 1,
      value: null,
    };
  }
  index += 3;
  if (input[index] !== "(") {
    return {
      index: index,
      value: null,
    };
  }
  index += 1;
  const num1 = readNumber(input, index);
  index = num1.index;
  if (num1.value === null || num1.value > 999) {
    return {
      index: index,
      value: null,
    };
  }

  if (input[index] !== ",") {
    return {
      index: index,
      value: null,
    };
  }
  index += 1;

  const num2 = readNumber(input, index);
  index = num2.index;
  if (num2.value === null || num2.value > 999) {
    return {
      index: index,
      value: null,
    };
  }
  if (input[index] !== ")") {
    return {
      index: index,
      value: null,
    };
  }
  index += 1;
  return {
    value: num1.value * num2.value,
    index: index,
    pair: [num1.value, num2.value],
  };
}

function task1(text: string): number {
  const data = parseText(text);
  let i = 0;
  let sum = 0;
  while (i < data.length) {
    const result = readMul(data, i);
    i = result.index;
    if (result.value !== null) {
      sum += result.value;
    }
  }
  return sum;
}

function task2(text: string): number {
  const data = parseText(text);
  let i = 0;
  let sum = 0;
  let isEnabled = true;
  while (i < data.length) {
    let startIndex = i;
    const doCommand = readCommand(data, i, "do()");
    if (doCommand.value !== null) {
      isEnabled = true;
    }
    i = doCommand.index;
    const dont = readCommand(data, i, "don't()");
    if (dont.value !== null) {
      isEnabled = false;
    }
    i = dont.index;
    if (isEnabled) {
      const result = readMul(data, i);
      i = result.index;
      if (result.value !== null) {
        sum += result.value;
      }
    }
    if (startIndex === i) {
      i++;
    }
  }
  return sum;
}
console.log(task2(data));
