var canvas = document.getElementById("canvas");
var brush  = canvas.getContext('2d');

// Test if the browser support canvas
function BubbleName() {
  this.x = 0;
  this.y = 0;
  this.gravity = 0.98;
  this.velocity = 0.4;
}

BubbleName.prototype.draw = function() {
  // create geometry letters
  var at = getHex('I');
  // also need to loop through colors
  // Random select colors
  var max = Object.keys(Color).length;
  var min = 1;
  var index = 0;
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  var count = Letter.numOfShape(at);

  var i = 0;
  for(;i < count; i++) {
    var _idx = Math.floor (Math.random() * (max-min)+min);  // color index used to select color
    if (_idx === index) {
      // Restart the loop add one more step to run
      i = i - 1;
      continue;
    }else {
      index = _idx;
      var circle = new Circle(Letter.getX(at, i), Letter.getY(at, i),
                              Letter.getRadi(at, i), Color.getClr(_idx));
      circle.draw(brush);


    }

  }
}
