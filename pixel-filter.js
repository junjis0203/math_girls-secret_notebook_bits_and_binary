var right = function right(input) {
  var output = [];
  for (var i = 0; i < 16; i++) {
    var x = input[i];
    x = x >> 1;
    output.push(x);
  }
  return output;
};

var left = function left(input) {
  var output = [];
  for (var i = 0; i < 16; i++) {
    var x = input[i];
    x = x << 1;
    output.push(x);
  }
  return output;
};

var up = function up(input) {
  var output = [];
  for (var i = 1; i < 16; i++) {
    var x = input[i];
    output.push(x);
  }
  output.push(0);
  return output;
};

var down = function down(input) {
  var output = [];
  output.push(0);
  for (var i = 0; i < 15; i++) {
    var x = input[i];
    output.push(x);
  }
  return output;
};

var complement = function complement(input) {
  var output = [];
  for (var i = 0; i < 16; i++) {
    var x = input[i];
    x = ~x;
    output.push(x);
  }
  return output;
};

var and = function and(input1, input2) {
  var output = [];
  for (var i = 0; i < 16; i++) {
    var a = input1[i];
    var b = input2[i];
    var x = a & b;
    output.push(x);
  }
  return output;
};