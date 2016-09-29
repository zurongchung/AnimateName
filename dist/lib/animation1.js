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
function Animation(_ofx, _ofy, _hexPos,_letters, _spacing) {
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
  this.gravity = 0.98;
  this.charAt  = _hexPos;         // an array
  this.numOfLetters = _letters;
  this.offsetX = _ofx * 0.2;
  this.offsetY = _ofy * 0.4;
  this.spacing = _spacing;

}

Animation.prototype.draw = function() {
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  this.bounce();
};

// core drawing function

Animation.prototype.bounce = function() {
  var hexcode = 0, letterWidth = 0, spacing = 0, color = 1;
  try {
    for (; hexcode < this.numOfLetters; ++hexcode) {
      var i = 0;
      for (;i < Point.numOfShape(this.charAt[hexcode]); ++i) {
        this.x = Point.getX(this.charAt[hexcode], i) + this.offsetX +
          letterWidth + spacing;
        this.y = Point.getY(this.charAt[hexcode], i) + this.offsetY;

        this.ls1 = Event.Mouse.ir;
        this.ls2 = Point.getRadi(this.charAt[hexcode], i);

        // this is how one circle moves around the other circle
        // The distance relationship between two circles
        this.dx = Event.Mouse.x - this.x;
        this.dy = Event.Mouse.y - this.y;
        this.ls3 = Module.getLenOfSlope(this.dx, this.dy);
        this.touchPoints(hexcode, i);
        //this.drawTouchPoints();   // Don't need. Delete it at release stage

        // visual center of circles
        //new Shape(this.x, this.y,2, Color.getClr(2)).draw();
        new Shape(this.x, this.y, Point.getRadi(this.charAt[hexcode], i),
         Color.getClr(color)).draw();

      }
      letterWidth += Point.width(this.charAt[hexcode]);
      spacing += this.spacing;
      if(color > Color.length()) {
        color = 1;
      }
      ++color;
    }

  } catch (e) {
    console.error(" Ani-func-bounce ", e.message);
  }
};

Animation.prototype.touchPoints = function(_hexcode,_idx){
  // Denominator can't be zero;
  // the angle used to calculate touch points
  // on the shape and on the invisible circle of the mouse
  if (this.yLess()) {
    Event.Mouse.theta = Module.dot2((Math.PI - Math.atan(this.dx / this.dy)) * -1);
    this.beta = Module.dot2(Math.atan(this.dx / this.dy));
  }else {
    Event.Mouse.theta = Module.dot2(Math.atan(this.dx / this.dy));
    this.beta = Module.dot2((Math.PI-Math.atan(this.dx / this.dy)) * -1);
  }

  // touche point coordinates
  if (this.y === Event.Mouse.y) {
    // Fix the buggy when mouse and circles Y coordinates are the same;
    var mr = Event.Mouse.ir;
    var cr = -Point.getRadi(this.charAt[_hexcode], _idx);
    if (this.xLess()) {mr *= -1; cr *= -1;}
    this.tmx = Event.Mouse.x + mr;
    this.tmy = Event.Mouse.y;
    this.tcx = this.x + cr;
    this.tcy = this.y;
  }else {
    // on circles
    this.tcx = Module.dot2(Math.sin(this.beta) * Point.getRadi(this.charAt[_hexcode], _idx) + this.x);
    this.tcy = Module.dot2(Math.cos(this.beta) * Point.getRadi(this.charAt[_hexcode], _idx) + this.y);
    // on mouse
    this.tmx = Module.dot2(Math.sin(Event.Mouse.theta) * Event.Mouse.ir + Event.Mouse.x);
    this.tmy = Module.dot2(Math.cos(Event.Mouse.theta) * Event.Mouse.ir + Event.Mouse.y);
  }
};

Animation.prototype.update = function(_idx) {

  //var radi = Point.getRadi(this.charAt, _idx);
  //if (this.xLess() || this.yLess()) {radi *= -1;}
  //this.x = this.tmx + radi;
  //this.y = this.tmy + radi;

  //this.x = this.tmx;
  //this.y = this.tmy;
  this.x += 10;

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
  return this.x === Event.Mouse.x || this.y === Event.Mouse.y ? 0 : Module.dot2((this.dy / this.dx));
};

Animation.prototype.drawTouchPoints = function() {
  // lines helps visualize the relationship between shapes
  new Shape().lines(Event.Mouse.x, Event.Mouse.y, this.x, this.y);
  new Shape().lines(this.x, this.y, this.x, Event.Mouse.y);
  new Shape().lines(this.x, Event.Mouse.y, Event.Mouse.x, Event.Mouse.y);

  // touche points
  new Shape(this.tcx, this.tcy, 3, Color.getClr(2)).draw();
  new Shape(this.tmx,this.tmy, 3, Color.getClr(4)).draw();
};
Animation.prototype.xLess = function() {
  return this.x < Event.Mouse.x;
};
Animation.prototype.yLess = function() {
  return this.y < Event.Mouse.y;
};
