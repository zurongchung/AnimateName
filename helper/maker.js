// Make alphabets By painting on the canvas
// output the points for alphabet.js

var Maker = {
  gdr: 1.618,
  defaultWidth: 194,
  defaultHeight: 120,
  gridDivision: 1,
  circleColor: [237, 205, 107],
  primary: 'rgb(93, 178, 221)',
  secondary: 'rgb(175, 162, 93)',
};

Maker.draw = function () {
  // Mouse x and y will be the center of circle
  // output the coordinates
  // only those circle appeared on the screen
  if (Maker.nextOne()) {
    var radi = 7;
    new Shape(Mouse.x, Mouse.y, radi, Maker.circleColor).draw();
    // output coordinates from here
    Maker.viewPoints(Mouse.x, Mouse.y, radi);
    }
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

// outputs coordinates
Maker.viewPoints = function (_x, _y, _r) {
  board.innerHTML = board.innerHTML + '[' + _x + ',' + _y + ',' + _r + ']' + ", ";
};

// copy points into clipboard
Maker.copy = function () {
  var clipboard = new Clipboard('#clip');
  clipboard.on('success', function(e) {
      console.log(e);
  });
  clipboard.on('error', function(e) {
      console.log(e);
  });
};

Maker.nextOne = function () {
  // if the length of slope between previous and next circle
  // is great than the radius of previous circle's radius
  // then draw
  var circleRadius = 7;
  var hrz = Mouse.x - Mouse.preX;
  var vrt = Mouse.y - Mouse.preY;
  var len = Math.round(Math.sqrt(Math.pow(hrz, 2) + Math.pow(vrt, 2)));
  return len - circleRadius >= -1 ? true : false;
};

Maker.shrinkBy = function (_div) {
  // shrink the width of a letter
  return Math.round(defaultHeight * gdr / _div);

};
