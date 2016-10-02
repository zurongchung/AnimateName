/*
 * @value true | false
 * Start | Stop animation
 */
var run = true;
var requestAnimationFrame = window.requestAnimationFrame;
function Animation() {
  // physics
  this.friction = 0.8;
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
    var n = 0;
    for (; n < this.points.length; ++n) {
      this.points[n].x += this.points[n].vx;
      this.points[n].y += this.points[n].vy;

      /*
       * Watching the length of hypotenuse
       * of each shape and mouse center
       * while it short then a specified value
       * e.g. 180
       * then animating that shape
       */
     this.dx = this.points[n].x - Event.Mouse.x;
     this.dy = this.points[n].y - Event.Mouse.y;
     this.dd = Math.floor(Math.sqrt(Math.pow(this.dx, 2) +
      Math.pow(this.dy, 2)));

    if (this.dd < Event.Mouse.ir) {
      this.points[n].vx += this.friction;
      this.points[n].vy += this.friction;
    }
      /*
       * Watching the length of hypotenuse
       * of shape's current position and original position\
       * while it longer than a specified value
       * e.g 60
       * it's like the shape's movement is forced inside an circle
       */
     var currentX = this.points[n].x;
     var currentY = this.points[n].y;
     var distX = currentX - this.points[n].origX;
     var distY = currentY - this.points[n].origY;
     var d = Math.floor(Math.sqrt(Math.pow(distX, 2) +
        Math.pow(distY, 2)));

      if (d > 60) {
        this.friction *= -1;
        this.points[n].vx += this.friction;
        this.points[n].vy += this.friction;
      }




    }
  };
  this.draw = function() {

    var i = 0;
    for (; i < this.points.length; ++i) {
      this.points[i].draw();
    }
  };

}
