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
  // touch point
  this.tcx = 0;
  this.tcy = 0;
  this.tmx = 0;
  this.tmy = 0;
  // length of hypotenuse on each circle
  this.ls1 = 0;
  this.ls2 = 0;
  this.ls3 = 0;

  this.vx = 0;
  this.vy = 0;
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
  try {
    for (;i < this.shapes; ++i) {

      this.x = Point.getX(this.charAt, i) + this.offsetX;
      this.y = Point.getY(this.charAt, i) + this.offsetY;


      this.ls1 = Mouse.ir;
      this.ls2 = Point.getRadi(this.charAt, i);

      // this is how one circle moves around the other circle
      // The distance relationship of the two circles
      this.dx = Mouse.x - this.x;
      this.dy = Mouse.y - this.y;
      this.ls3 = Module.getLenOfSlope(this.dx, this.dy);


      this.touchPoints(i);
      this.drawTouchPoints();   // Don't need. Delete it at release stage
      
      // start bouncing when the mouse touches those circles
      if (this.hasTouched()) {
        this.update(i);
      }


      // visual center of circles
      new Shape(this.x, this.y,2, Color.getClr(2)).draw();

      //this.vx += this.gravity;
      new Shape(this.x, this.y, Point.getRadi(this.charAt, i), Color.getClr(iclr)).stroke();

      if (iclr < this.wordsLength) {
        ++iclr;
      }
    }
  } catch (e) {
    console.error(" Ani-func-bounce ", e.message);
  }
};

Animation.prototype.touchPoints = function(_idx){
  // Denominator can't be zero;
  // the angle used to calculate touch points
  // on the shape and on the invisible circle of the mouse
  if (this.yLess()) {
    Mouse.theta = Module.dot2((Math.PI - Math.atan(this.dx / this.dy)) * -1);
    this.beta = Module.dot2(Math.atan(this.dx / this.dy));
  }else {
    Mouse.theta = Module.dot2(Math.atan(this.dx / this.dy));
    this.beta = Module.dot2((Math.PI-Math.atan(this.dx / this.dy)) * -1);
  }

  // touche point coordinates
  if (this.y === Mouse.y) {
    // Fix the buggy when mouse and circles Y coordinates are the same;
    var mr = Mouse.ir;
    var cr = -Point.getRadi(this.charAt, _idx);
    if (this.xLess()) {mr *= -1; cr *= -1;}
    this.tmx = Mouse.x + mr;
    this.tmy = Mouse.y;
    this.tcx = this.x + cr;
    this.tcy = this.y;
    console.log('oopa');
  }else {
    // on circles
    this.tcx = Module.dot2(Math.sin(this.beta) * Point.getRadi(this.charAt, _idx) + this.x);
    this.tcy = Module.dot2(Math.cos(this.beta) * Point.getRadi(this.charAt, _idx) + this.y);
    // on mouse
    this.tmx = Module.dot2(Math.sin(Mouse.theta) * Mouse.ir + Mouse.x);
    this.tmy = Module.dot2(Math.cos(Mouse.theta) * Mouse.ir + Mouse.y);
  }
};

Animation.prototype.update = function(_idx) {

  //var radi = Point.getRadi(this.charAt, _idx);
  //if (this.xLess() || this.yLess()) {radi *= -1;}
  //this.x = this.tmx + radi;
  //this.y = this.tmy + radi;

  this.x = this.tmx;
  this.y = this.tmy;

};

Animation.prototype.hasTouched = function() {

  // i think here is the problem. that when touched.
  // the slope still center to the original point
  var t = Math.abs(this.ls3 - (this.ls2 + this.ls1));
  return  t <= 0.1 || this.ls3 < (this.ls2 + this.ls1) && this.ls3 != 0 ? true : false;
};

Animation.prototype.bouncing = function() {
  this.vx *= 1;
  this.vy *= 1;
};

Animation.prototype.bouncePath = function() {
  return Module.dot2(this.y - (((this.x + this.vx) - this.x) * this.haslope() + this.y));
};


Animation.prototype.haslope = function() {
  return this.x === Mouse.x || this.y === Mouse.y ? 0 : Module.dot2((this.dy / this.dx));
};
/* Deprecated
Animation.prototype.slopeInCircle = function() {
  // the lenght of that slope between the two circle
  // Distance of the circle and the mouse point
  var tmdx, tmdy, tcdx, tcdy;

  tcdx = Module.distance(this.x, this.tcx);
  tcdy = Module.distance(this.y, this.tcy);
  tmdx = Module.distance(Mouse.x, this.tmx);
  tmdy = Module.distance(Mouse.y, this.tmy);

  this.ls2 = Module.getLenOfSlope(tcdx, tcdy);
  //this.ls1 = Module.getLenOfSlope(tmdx, tmdy);
};


Animation.prototype.longestSlope = function() {
  this.ls3 = Module.getLenOfSlope(this.dx, this.dy);
};
*/

Animation.prototype.drawTouchPoints = function() {
  // lines helps visualize the relationship between shapes
  new Shape().lines(Mouse.x, Mouse.y, this.x, this.y);
  new Shape().lines(this.x, this.y, this.x, Mouse.y);
  new Shape().lines(this.x, Mouse.y, Mouse.x, Mouse.y);

  // touche points
  new Shape(this.tcx, this.tcy, 3, Color.getClr(2)).draw();
  new Shape(this.tmx,this.tmy, 3, Color.getClr(4)).draw();
};
Animation.prototype.xLess = function() {
  return this.x < Mouse.x;
};
Animation.prototype.yLess = function() {
  return this.y < Mouse.y;
};
