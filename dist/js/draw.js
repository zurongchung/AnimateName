var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');

//  !!!!!   Test if the browser support canvas
var BubbleName = {
  w: canvas.width,
  h: canvas.height,
  offsetX: function(){return BubbleName.w * 0.2;},
  offsetY: function(){return BubbleName.h * 0.4;},
};


BubbleName.draw = function() {
  // get geometry letters
  var hex = new LetterToHex('A');
  var charAt = hex.getHex();
  var count = Point.numOfShape(charAt);
  // Fill the canvas with color
  BubbleName.resetCanvas();
  var bounce = new Animation(BubbleName.w, BubbleName.h, charAt, count, hex.length);
  bounce.draw();
  //Animation.setAnimation(BubbleName.w, BubbleName.h, charAt, count, hex.length);
  //Animation.draw();
};

// canvas background
BubbleName.resetCanvas = function () {
  brush.fillStyle = 'black';
  brush.fillRect(0, 0, BubbleName.w, BubbleName.h);
};
