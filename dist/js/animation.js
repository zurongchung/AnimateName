/*
 * @value true | false
 * Start | Stop animation
 */
var run = true;
var requestAnimationFrame = window.requestAnimationFrame;
function Animation() {

 /*
  * @prop dx is the horizontal distance
  * @prop dy is the vertical distance
  * @prop dd is the length of hypotenuse / the distance
  * between shape and mouse center
  */
  this.dx = 0;
  this.dy = 0;
  this.dd = 0;
  /*
   * @prop points formes our animation
   */
  this.points = [];
  var self = this;
  this.init = function() {
    this.points = BubbleName.shapes;
    BubbleName.resetCanvas();
    self.update();
    self.draw();
    if (run) {
      requestAnimationFrame(self.init);
    }
  };
  this.update = function() {
  
  };
  this.draw = function() {

    var i = 0;
    for (; i < this.points.length; ++i) {
      this.points[i].draw();
    }
  };

}
