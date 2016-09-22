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
//  for terminate Animation
var rAF_id;

var Animation = {
  x  : 0,
  y  : 0,
  dx : 0,
  dy : 0,
  vx : -25,
  vy : 6,
  charAt  : 0,
  shapes  : 0,
  offsetX : 0,
  offsetY : 0,
  wordsLength : 0,
  gravity : 0.98,
};

Animation.setAnimation = function(_ofx, _ofy, _hexPos, _count, _len){
  Animation.charAt = _hexPos;
  Animation.shapes =  _count;
  Animation.offsetX = _ofx * 0.2;
  Animation.offsetY = _ofy * 0.4;
  Animation.wordsLength = _len;
};
Animation.draw = function() {
  //Animation.shakeWithColor(Animation.charAt);
  // get the length of the key of [p]
  // indicates how many shape needs to draw
  Animation.bounce();
  Animation.update();
};

// core drawing function

Animation.bounce = function() {
  var iclr = 1;     // select new color for next letters
  var i = 0;
  for (;i < Animation.shapes; ++i) {

    Animation.x = Point.getX(Animation.charAt, i) + Animation.offsetX;
    Animation.y = Point.getY(Animation.charAt, i) + Animation.offsetY;

    var circle = new Circle(Animation.x, Animation.y, Point.getRadi(Animation.charAt, i), Color.getClr(iclr));

    if (iclr < Animation.wordsLength) {
      ++iclr;
    }
      circle.draw();
  }

};
Animation.update = function() {


  if (Animation.x > Mouse.x - Mouse.ir-4) {
    Animation.vx *= -1;
    Animation.vy *= 1;

  }
  Animation.vx += Animation.gravity;

};
