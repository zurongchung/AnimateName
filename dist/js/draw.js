var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');

//  !!!!!   Test if the browser support canvas
var BubbleName = {
  w: canvas.width,
  h: canvas.height,
};
// Attach mouse event to canvas
Mouse.event.movement(canvas);
Mouse.event.over(canvas);
Mouse.event.out(canvas);

BubbleName.draw = function() {
  // get geometry letters
  var hex = new LetterToHex('A');
  // Fill the canvas with color
  BubbleName.resetCanvas();
//  Animation.testAni(at);
  var shake = new Animation(BubbleName.w, BubbleName.h, hex.length);
  shake.wiggle(hex.getHex());
};

// canvas background
BubbleName.resetCanvas = function () {
  brush.fillStyle = 'black';
  brush.fillRect(0, 0, BubbleName.w, BubbleName.h);
};
