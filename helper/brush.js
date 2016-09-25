// tools used to draw on the canvas

var Brush = {
  size  : 7,
  color : [240, 240, 240],
  cmd   : {
    increase: 'BracketLeft',
    decrease: 'BracketRight',
    keydown : 'keydown',
  },

};

Brush.view = function () {
  new Shape(Mouse.x, Mouse.y, Brush.size, Brush.color).draw();
};
