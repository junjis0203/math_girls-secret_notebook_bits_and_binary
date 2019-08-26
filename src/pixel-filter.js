const right = (input) => {
  const output = [];
  for (let i = 0; i < 16; i++) {
    let x = input[i];
    x = x >> 1;
    output.push(x);
  }
  return output;
};

const left = (input) => {
  const output = [];
  for (let i = 0; i < 16; i++) {
    let x = input[i];
    x = x << 1;
    output.push(x);
  }
  return output;
};

const up = (input) => {
  const output = [];
  for (let i = 1; i < 16; i++) {
    const x = input[i];
    output.push(x);
  }
  output.push(0);
  return output;
};

const down = (input) => {
  const output = [];
  output.push(0);
  for (let i = 0; i < 15; i++) {
    const x = input[i];
    output.push(x);
  }
  return output;
};

const complement = (input) => {
  const output = [];
  for (let i = 0; i < 16; i++) {
    let x = input[i];
    x = ~x;
    output.push(x);
  }
  return output;
};

const and = (input1, input2) => {
  const output = [];
  for (let i = 0; i < 16; i++) {
    const a = input1[i];
    const b = input2[i];
    const x = a & b;
    output.push(x);
  }
  return output;
};
