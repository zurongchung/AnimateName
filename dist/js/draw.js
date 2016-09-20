var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');

//  !!!!!   Test if the browser support canvas
var BubbleName = {
  w: canvas.width,
  h: canvas.height,
  offsetX: canvas.width * 0.2,
  offsetY: canvas.height * 0.35,
};
// Attach mouse event to canvas
Mouse.event.movement(canvas);
Mouse.event.over(canvas);
Mouse.event.out(canvas);

BubbleName.draw = function() {
  // get geometry letters
  var hex = new LetterToHex('A');
  // Fill the canvas with color
  BubbleName.setBg(brush);
//  Animation.testAni(at);
  var shake = new Animation();
  shake.wiggle(hex.getHex());
};

// canvas background
BubbleName.setBg = function (_brush) {
  _brush.clearRect(0, 0, BubbleName.w, BubbleName.h);
  //_brush.fillRect(0, 0, BubbleName.w, BubbleName.h);
  //_brush.fillStyle = 'rgba(0,0,0,0)';
  //_brush.fill();
};
