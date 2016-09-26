var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');

//  !!!!!   Test if the browser support canvas
var BubbleName = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height,
  // get geometry letters
  hex: function(){return new LetterToHex('A');},
  charAt: function() {return BubbleName.hex().getHex();},
  count: function() {return Point.numOfShape(BubbleName.charAt());},

  offsetX: function(){return BubbleName.w * 0.2;},
  offsetY: function(){return BubbleName.h * 0.4;},
};


BubbleName.draw = function(_inDesign) {

  // Fill the canvas with color
  BubbleName.resetCanvas();
  if (_inDesign) {
    // in design mode
    Maker.frame();
    Maker.grid();
  }else {
    // production mode
    BubbleName.init();
  }
};

// canvas background
BubbleName.resetCanvas = function () {
  brush.fillStyle = 'black';
  brush.fillRect(0, 0, BubbleName.w, BubbleName.h);
};
BubbleName.init = function () {
  var iclr = 1;     // select new color for next letters
  var i = 0;
  try {
    for (;i < BubbleName.count(); ++i) {

      BubbleName.x = Point.getX(BubbleName.charAt(), i) + BubbleName.offsetX();
      BubbleName.y = Point.getY(BubbleName.charAt(), i) + BubbleName.offsetY();

      new Shape(BubbleName.x, BubbleName.y, Point.getRadi(BubbleName.charAt(), i), Color.getClr(iclr)).stroke();

      if (iclr < BubbleName.hex().length) {
        ++iclr;
      }
    }
  } catch (e) {
    console.error(" BubbleName-func-init ", e.message);
  }
};
