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
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  console.log(Letter.numOfShape(at));
}
