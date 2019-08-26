'use strict';

var bin2hex = function bin2hex(bin) {
  var result = 0;
  for (var i = 0; i < 16; i++) {
    result |= parseInt(bin[i]) << 15 - i;
  }
  return result;
};

var bins2hexs = function bins2hexs(bins) {
  return bins.map(function (bin) {
    return bin2hex(bin);
  });
};

var input1 = bins2hexs(['0000000000000000', '0000000000000000', '0011111111111100', '0011111111111100', '0011111111111100', '0011100000000000', '0011100000000000', '0011111111100000', '0011111111100000', '0011111111100000', '0011100000000000', '0011100000000000', '0011100000000000', '0011100000000000', '0000000000000000', '0000000000000000']);