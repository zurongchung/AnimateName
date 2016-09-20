var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');
var rAF_id;
//  !!!!!   Test if the browser support canvas
var BubbleName = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height,
  offset: canvas.width * 0.2,
};
// Attach mouse event to canvas
Mouse.event.movement(canvas);
Mouse.event.over(canvas);
Mouse.event.out(canvas);

BubbleName.draw = function(evt) {

  // get geometry letters
  var at = getHex('A');

  // Fill the canvas with color
  BubbleName.setBg(brush);
  // also need to loop through colors
  // Random select colors
  var max = Object.keys(Color).length;
  var min = 1;
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  var count = Letter.numOfShape(at);
  var i = 0;
  for (;i < count; i++) {
    var _idx = Math.floor (Math.random() * (max-min)+min);  // color index used to select color

    BubbleName.x = Letter.getX(at, i) + BubbleName.offset + Math.random()* 0.5;
    BubbleName.y = Letter.getY(at, i) + BubbleName.offset + Math.random();
    if (i % 2 === 0 && _idx % 2 === 0) {
      var circle = new Circle(BubbleName.x, BubbleName.y,
                  Letter.getRadi(at, i), Color.getClr(_idx));
    }else if (i % 2 !== 0 && _idx % 2 !== 0) {
      var circle = new Circle(BubbleName.x, BubbleName.y,
                  Letter.getRadi(at, i), Color.getClr(_idx));
    }else {
      i = i - 1;
      continue;
    }
    circle.draw(brush);
  }
  //rAF(BubbleName.draw);
  if (evt === Mouse.over) {
    rAF_id  = rAF(BubbleName.draw);
    console.log(evt);
  }
};

// canvas background
BubbleName.setBg = function (_brush) {
  brush.clearRect(0, 0, BubbleName.w, BubbleName.h);
//  _brush.fillRect(0, 0, BubbleName.w, BubbleName.h);
//  _brush.fillStyle = 'black';
//  _brush.fill();
};
