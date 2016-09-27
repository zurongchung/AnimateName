var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');

//  !!!!!   Test if the browser support canvas
var BubbleName = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height,
  spacing: 20,    // space between letters
  // get geometry letters
  hex: function(){return new LetterToHex('AB');},
  charAt: function() {return BubbleName.hex().getHex();}, // Is an array
  numOfLetters: function() {return BubbleName.hex().getLength();},

  offsetX: function(){return BubbleName.w * 0.2;},
  offsetY: function(){return BubbleName.h * 0.4;},
};


/*-----------------------------------------------------

  Design and production view has different
  background use:

  @param  _inDesign

  inorder to render different background

-----------------------------------------------------*/

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

  var hexcode = 0;
  var letterWidth = 0;
  var spacing = 0;
  try {
    for (; hexcode < BubbleName.numOfLetters(); ++hexcode) {
      var color = hexcode + 1;
      var i = 0;
      for (;i < Point.numOfShape(BubbleName.charAt()[hexcode]); ++i) {
        BubbleName.x = Point.getX(BubbleName.charAt()[hexcode], i) +
        BubbleName.offsetX() + letterWidth + spacing;
        BubbleName.y = Point.getY(BubbleName.charAt()[hexcode], i) +
        BubbleName.offsetY();

        new Shape(BubbleName.x, BubbleName.y,
          Point.getRadi(BubbleName.charAt()[hexcode], i),
         Color.getClr(color)).draw('stroke');

      }
      letterWidth = letterWidth = Point.width(BubbleName.charAt()[hexcode]);
      spacing = BubbleName.spacing;
    }

  } catch (e) {
    console.error(" BubbleName-func-init ", e.message);
  }
};
