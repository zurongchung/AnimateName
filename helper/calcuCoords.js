/*
#  HERE is the equation to find any coordinates on the slope of two points
    m = (y2-y1)/(x2-x1)
or  (y2-y1) = (x2-x1)m

By given an Known point(x1,y1) and either given a second x2 or y2
we can calculate the unkonwn and get a new point that's on the slope
*/
var h_ele = document.querySelector('input[name="height"]');

var GoldenRatio = 1.618;

function Points(_w) {
  this.w = _w;
  this.h = this.w / GoldenRatio;
  // Known coordinates
  this.x = ;
  this.y = ;
  this.x1 = ;
  this.y1 = ;
  // unkonwn coordinates
  this.x2 = ;
  this.y2 = member();
  this.slope = slope();
}
Points.prototype.member = function() {
  // Given a x2 to calculate y2
  // return a coordinate that's on the slope
  return ((this.x2 - this.x) * this.slope) + this.y;
}

Points.prototype.slope = function() {
  return (this.y1 - this.y)/(this.x1 - this.x);
}

// display height on the page
Points.prototype.getHeight = function() {
  return this.h;
}
