/*
#  HERE is the equation to find any coordinates on the slope of two points
    m = (y2-y1)/(x2-x1)
or  (y2-y1) = (x2-x1)m

By given an Known point(x1,y1) and either given a second x2 or y2
we can calculate the unkonwn and get a new point that's on the slope
*/
var w_ele = document.querySelector('input[name="width"]');
var h_ele = document.querySelector('input[name="height"]');
var division = document.querySelector('input[name="division"]');
var gap = document.querySelector('input[name="gap"]').value;
var quantity = document.querySelector('input[name="quantity"]').value;

var GoldenRatio = 1.618;

// Attach event listener
h_ele.addEventListener('change', newPoint, false);
function newPoint() {
  var p = new Points(h_ele.value, division.value);
  w_ele.value = p.getWidth();
}

function Points(_h, _dis) {
  this.h = _h;
  this.dis = _dis;
  this.w = this.letterWide();
  // Known coordinates
  this.x = 0;
  this.y = this.h;      // base lower-left corner
  this.x1 = this.w / this.dis;
  this.y1 = 0;
  // unkonwn coordinates
  this.x2 = 0;
  this.y2 = this.member();
  this.slope = this.slope();
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
Points.prototype.getWidth = function() {
  return this.w;
}
// how wide this letter is
Points.prototype.letterWide = function() {
  console.log(this.dis);
  return Math.round((this.h * GoldenRatio) / this.dis);
}
