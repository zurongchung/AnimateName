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

var Animation = {
  x : 0,
  y : 0,
  dx : 0,
  dy : 0,
  vx : 1.5,  // left and right
  vy : 1.6,  // up and down
  gravity : 0.98,
  amplitude : Math.random() * 10 - 5,
};

Animation.wiggle = function(_at) {
  Animation.testAni(_at);
};

// core drawing function
Animation.testAni = function(_at) {
  // default location
  Animation.x = Letter.getX(_at, 1) + BubbleName.offsetX;
  Animation.y = Letter.getY(_at, 1) + BubbleName.offsetY;

  Animation.dx += Animation.vx;
  Animation.dy += Animation.vy;


  if (Animation.y >= 200) {
    Animation.vy *= Animation.gravity;
    Animation.dy *= Animation.vy;
    console.log('hi');
  }


  Animation.x += Animation.dx;
  Animation.y += Animation.dy;


  var circle = new Circle(Animation.x, Animation.y,
              Letter.getRadi(_at, 1), Color.getClr(1));
  circle.draw(brush);
  //console.log('x: ' + Animation.x + ' y: ' + Animation.y);
};
