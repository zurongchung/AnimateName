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
  //hex: function(){return new LetterToHex('ABCDGH');},
  hex: function(){return new LetterToHex(username.value);},

  charAt: function() {return this.hex().getHex();}, // Is an array
  numOfLetters: function() {return this.hex().getLength();},

  offsetX: function(){return this.w * 0.2;},
  offsetY: function(){return this.h * 0.4;},
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
    Animation.collectPoints();
    BubbleName.init();
  }
};
// canvas background
BubbleName.resetCanvas = function () {
  brush.fillStyle = 'black';
  brush.fillRect(0, 0, BubbleName.w, BubbleName.h);
};
BubbleName.init = function () {

  var hexcode = 0, letterWidth = 0, spacing = 0,  color = 1;
  try {
    for (; hexcode < BubbleName.numOfLetters(); ++hexcode) {

      var i = 0;
      for (;i < Point.numOfShape(BubbleName.charAt()[hexcode]); ++i) {
        BubbleName.x = Point.getX(BubbleName.charAt()[hexcode], i) +
        BubbleName.offsetX() + letterWidth + spacing;
        BubbleName.y = Point.getY(BubbleName.charAt()[hexcode], i) +
        BubbleName.offsetY();

        new Shape(BubbleName.x, BubbleName.y,
          Point.getRadi(BubbleName.charAt()[hexcode], i),
         Color.getClr(color)).draw();

      }
      letterWidth += letterWidth = Point.getWidth(BubbleName.charAt()[hexcode]);
      spacing += BubbleName.spacing;
      if(color > Color.length()) {
        color = 1;
      }
      ++color;
    }

  } catch (e) {
    console.error(" BubbleName-func-init ", e.message);
  }
};
