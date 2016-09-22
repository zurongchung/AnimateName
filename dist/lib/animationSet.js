// Animations trigger by mouse event

// cross browser support
window.rAF = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var cAF = window.cancelAnimationFrame ||
          window.mozCancelAnimationFrame;
//  id of window.requestAnimationFrame
//  for terminate animation
var rAF_id;

function Animation(_ofx, _ofy, _hexPos, _count, _len) {
  this.x  = 0;
  this.y  = 0;
  this.dx = 0;
  this.dy = 0;
  this.beta = 0;
  this.vx = -12;
  this.vy = 6;
  this.charAt  = _hexPos;
  this.shapes  = _count;
  this.offsetX = _ofx * 0.2;
  this.offsetY = _ofy * 0.4;
  this.gravity = 0.98;
  this.wordsLength = _len;
}

Animation.prototype.draw = function() {
  //this.shakeWithColor(this.charAt);
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  var count = Point.numOfShape(this.charAt);
  this.bounce();

};

// core drawing function

Animation.prototype.bounce = function() {
  var iclr = 1;     // select new color for next letters
  var i = 0;
  var theSlope, LenOfSlope;
  for (;i < 1; ++i) {

    this.x = Point.getX(this.charAt, i) + this.offsetX;
    this.y = Point.getY(this.charAt, i) + this.offsetY;

    // this is how one circle moves around the other circle
    // The relationship between the two circles
    this.dx = this.x - Mouse.x;
    this.dy = this.y - Mouse.y;

    LenOfSlope = this.lengthOfSlope();
// Denominator can't be zero;
    if (this.y < Mouse.y) {
      Mouse.theta = Module.dot2((Math.PI-Math.atan(this.dx/this.dy))*-1);
      this.beta = Module.dot2(Math.atan(this.dx/this.dy));
    }else {
      Mouse.theta = Module.dot2(Math.atan(this.dx/this.dy));
      this.beta = Module.dot2((Math.PI-Math.atan(this.dx/this.dy))*-1);
    }


    console.log('d: '+Math.round(180/Math.PI*this.beta));
    console.log('r: '+this.beta);
    console.log('bd: '+Math.round(180/Math.PI*Mouse.theta));
    console.log('br: '+Mouse.theta);




    theSlope = this.hasSlope();

    // draw lines
    new Shape().lines(Mouse.x, Mouse.y, this.x, this.y);
    new Shape().lines(this.x, this.y, this.x, Mouse.y);
    new Shape().lines(this.x, Mouse.y, Mouse.x, Mouse.y);

    var circle = new Shape(this.x, this.y, Point.getRadi(this.charAt, i), Color.getClr(iclr));

    new Shape(Math.sin(this.beta)*Point.getRadi(this.charAt, i)+
      this.x, Math.cos(this.beta)*Point.getRadi(this.charAt, i)+
      this.y, 4, Color.getClr(2)).draw();



    if (iclr < this.wordsLength) {
      ++iclr;
    }
      circle.stroke();
  }

};
Animation.prototype.update = function() {

};
Animation.prototype.hasSlope = function() {
  return this.x == Mouse.x || this.y == Mouse.y ? false : Module.dot2((this.dy / this.dx));
};
Animation.prototype.lengthOfSlope = function() {
  // the lenght of that slope between the two circle
  // Distance of the circle and the mouse point
  return Module.dot2(Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2)));
};
