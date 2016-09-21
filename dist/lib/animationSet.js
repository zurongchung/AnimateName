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

function Animation(_ofx, _ofy, _len) {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.offsetX = _ofx * 0.2;
  this.offsetY = _ofy * 0.4;
  this.amtuX = 2;  // left and right
  this.amtuY = Math.random() * 4;  // up and down
  this.gravity = 0.98;
  this.velocity = 2.4;
  this.amplitude = 0.94;
  this.wordsLength = _len;
}

Animation.prototype.wiggle = function(_at) {
  //this.shakeWithColor(_at);
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  var count = Letter.numOfShape(_at);
  this.draw(count, _at);
};

// core drawing function

Animation.prototype.draw = function(_quantity, _at) {
  var iclr = 1;     // select new color for next letters
  var i = 0;
  for (;i < _quantity; ++i) {
    this.x = Letter.getX(_at, i) + this.offsetX + this.amtuX;
    this.y = Letter.getY(_at, i) + this.offsetY + this.amtuY;
    // color manipulation
    // static
    var circle = new Circle(this.x, this.y,
                Letter.getRadi(_at, i), Color.getClr(iclr));
    // if reached last color then return to first color and loop again
  //  clrIdx === max ? clrIdx = 1 : ++clrIdx;
  if (iclr < this.wordsLength) {
    ++iclr;
  }
    circle.draw();
  }

};

Animation.prototype.shakeWithColor = function(_at) {
  var max = Color.length();
  var min = 1;
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  var count = Letter.numOfShape(_at);
  var i = 0;
  for (;i < count; ++i) {
    var _idx = Math.floor (Math.random() * (max-min)+min);  // color index used to select color
    this.x = Letter.getX(_at, i) + BubbleName.offsetX + this.amtuX;
    this.y = Letter.getY(_at, i) + BubbleName.offsetY + this.amtuY;
    // color manipulation
    // dynamic
    if (i % 2 === 0 && _idx % 2 === 0) {
      var circle = new Circle(this.x, this.y,
                  Letter.getRadi(_at, i), Color.getClr(_idx));
    }else if (i % 2 !== 0 && _idx % 2 !== 0) {
      var circle = new Circle(this.x, this.y,
                  Letter.getRadi(_at, i), Color.getClr(_idx));
    }else {
      i = i - 1;
      continue;
    }
    circle.draw();
  }
};
