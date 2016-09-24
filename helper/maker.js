// Make alphabets By painting on the canvas
// output the points for alphabet.js

var Maker = {
  gdr: 1.618,
  defaultWidth: 194,
  defaultHeight: 120,
  gridDivision: 1,
  primary: 'rgb(93, 178, 221)',
  secondary: 'rgb(175, 162, 93)',
};

Maker.draw = function () {

};
Maker.grid = function () {
  var gx = BubbleName.offsetX();
  var gy = BubbleName.offsetY();
  // alphabet width and height
  var aw = Maker.defaultWidth;
  var ah = Maker.defaultHeight;
  // left
  new Shape().lines(gx, gy, gx, gy + ah, Maker.primary);

  // right
  new Shape().lines(gx + aw, gy, gx + aw, gy + ah, Maker.primary);

  // center
  new Shape().lines(gx + (aw / 2), gy, gx + (aw / 2), gy + ah, Maker.primary);

  // left half center
  new Shape().lines(gx + (aw / 4), gy, gx + (aw / 4), gy + ah, Maker.secondary);

  // right half center
  new Shape().lines(gx + (aw * (3/4)), gy, gx + (aw * (3/4)), gy + ah, Maker.secondary);
};
Maker.frame = function () {
  // top
  new Shape().lines(0, BubbleName.offsetY(), BubbleName.w, BubbleName.offsetY(), Maker.primary);

  //center
  new Shape().lines(0, BubbleName.offsetY() + Maker.defaultHeight / 2,
  BubbleName.w, BubbleName.offsetY() + Maker.defaultHeight / 2, Maker.secondary);

  // bottom
  new Shape().lines(0, BubbleName.offsetY() + Maker.defaultHeight,
  BubbleName.w, BubbleName.offsetY() + Maker.defaultHeight, Maker.primary);

};
Maker.shrinkBy = function (_div) {
  // shrink the width of a letter
  return Math.round(defaultHeight * gdr / _div);

};
