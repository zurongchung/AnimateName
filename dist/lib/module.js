// custome method for quick and easy to handle tedious proccess
var Module = {};
Module.dot2 = function (_obj) {
  return parseFloat(_obj.toFixed(2));
};
Module.getLenOfSlope = function(_x, _y) {
  return Module.dot2(Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2)))
};
Module.distance = function(_from, _to) {
  return Module.dot2(Math.abs(_from - _to));
};
