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

function Animation() {
  this.dx = 0;
  this.dy = 0;
  this.amtuX = Math.random() * 0.5;  // left and right
  this.amtuY = 0;  // up and down
  this.gravity = 0.98;
  this.velocity = 0.4;
  this.amplitude = 0.94;
}

Animation.prototype.wiggle = function(e) {
  BubbleName.draw(e);
  rAF_id = rAF(new Animation().wiggle);
};
