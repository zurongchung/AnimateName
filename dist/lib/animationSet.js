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
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.vx = -12;
  this.vy = 1;
  this.charAt =_hexPos;
  this.shapes = _count;
  this.offsetX = _ofx * 0.2;
  this.offsetY = _ofy * 0.4;
  this.gravity = 0.98;
  this.amplitude = 0.94;
  this.wordsLength = _len;
}

Animation.prototype.draw = function() {
  //this.shakeWithColor(this.charAt);
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  var count = Point.numOfShape(this.charAt);
  this.bounce();
  this.update();
};

// core drawing function

Animation.prototype.bounce = function() {
  var iclr = 1;     // select new color for next letters
  var i = 0;
  for (;i < this.shapes; ++i) {
    this.x = Point.getX(this.charAt, i) + this.offsetX;
    this.y = Point.getY(this.charAt, i) + this.offsetY;

    var circle = new Circle(this.x, this.y, Point.getRadi(this.charAt, i), Color.getClr(iclr));

    if (iclr < this.wordsLength) {
      ++iclr;
    }
      circle.draw();
  }

};
Animation.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;

};

Animation.prototype.shakeWithColor = function() {
  var max = Color.length();
  var min = 1;
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  var count = Point.numOfShape(this.charAt);
  var i = 0;
  for (;i < count; ++i) {
    var _idx = Math.floor (Math.random() * (max-min)+min);  // color index used to select color
    this.x = Point.getX(this.charAt, i) + BubbleName.offsetX;
    this.y = Point.getY(this.charAt, i) + BubbleName.offsetY;
    // color manipulation
    // dynamic
    if (i % 2 === 0 && _idx % 2 === 0) {
      var circle = new Circle(this.x, this.y,
                  Point.getRadi(this.charAt, i), Color.getClr(_idx));
    }else if (i % 2 !== 0 && _idx % 2 !== 0) {
      var circle = new Circle(this.x, this.y,
                  Point.getRadi(this.charAt, i), Color.getClr(_idx));
    }else {
      i = i - 1;
      continue;
    }
    circle.draw();
  }
};
