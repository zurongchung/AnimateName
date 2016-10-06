var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');

//  !!!!!   Test if the browser support canvas
var BubbleName = {
  x: 0,
  y: 0,
  radi: 0,
  w: canvas.width,
  h: canvas.height,
  original: [],
  shapes: [],
  spacing: 20,    // space between letters
  // get geometry letters
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
    BubbleName.init();
  }
};
// Until i found out a way to do deep array copys
// I need to do collect points multiple times at lease two times
// fetch points from alphabet database when app started.
// Never call it from animation
BubbleName.collectPoints = function() {
  // clear previous collected points when user changes the inputs
  BubbleName.original = [];
  var letterWidth = 0, spacing = 0;
  var letter = 0;
  for(; letter < BubbleName.numOfLetters(); ++letter) {
    var index = 0;
    var tmp = [];
    var at = BubbleName.charAt()[letter];
    for(; index < Point.numOfShape(at); ++index) {
      var xyr = [];
      xyr.push(Point.getX(at, index) + BubbleName.offsetX() + letterWidth + spacing);
      xyr.push(Point.getY(at, index) + BubbleName.offsetY());
      xyr.push(Point.getRadi(at, index));
      tmp.push(xyr);
    }
    letterWidth += Point.getWidth(at);
    spacing += BubbleName.spacing;
     // initial position when first time create letters
    BubbleName.original.push(tmp);
  }
};

// canvas background
BubbleName.resetCanvas = function () {
  brush.fillStyle = 'black';
  brush.fillRect(0, 0, BubbleName.w, BubbleName.h);
};
BubbleName.init = function () {
  BubbleName.collectPoints();
  try {
    var letter = 0;
    for(; letter < BubbleName.original.length; ++letter) {
      var color = letter > Color.length ? 1 : letter + 1;
      var i = 0;
      for (; i < BubbleName.original[letter].length; ++i) {
        BubbleName.x = BubbleName.original[letter][i][0];
        BubbleName.y = BubbleName.original[letter][i][1];
        BubbleName.radi = BubbleName.original[letter][i][2];

        var circle = new Shape(BubbleName.x, BubbleName.y,BubbleName.radi,
          Color.getColor(color));
          circle.draw();
         BubbleName.shapes.push(circle);
      }
    }
    console.log(BubbleName.shapes);

  } catch (e) {
    console.error(" BubbleName-func-init ", e.message);
  }
};
BubbleName.redraw = function() {
  BubbleName.resetCanvas();
  BubbleName.init();
};
