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
var slp = document.querySelector('i.slope');

// display calculated coordinates
var board = document.querySelector('code.coords');
var start   = document.querySelector('#start');
var cls   = document.querySelector('#cls');
var get   = document.querySelector('#getPoints');

// alphabet to charcode
var at = document.querySelector('.ccode');
var letter = document.querySelector('input[name="letter"]');


var GoldenRatio = 1.618;

// Attach event listener
letter.addEventListener('keyup', atoCode, false);
letter.addEventListener('click', clear, false);
start.addEventListener('click', newPoint, false);
cls.addEventListener('click', clsBoard, false);
get.addEventListener('click', generatePoints, false);

function generatePoints() {
  board.innerHTML = '';
  Maker.output();
}

function atoCode() {
  // alphabet-to-char code
  var code = letter.value.charCodeAt("0");
  at.innerHTML = code;

}
function clear() {
  letter.value = '';
  at.innerHTML = '';
}
function clsBoard() {
  board.innerHTML = '';
  slp.innerHTML = '';
  // clear shifted points
  Maker.clearCollectPoint();
  // clear canvas
  BubbleName.draw();
}
function letterWide() {
  return Math.round((h_ele.value * GoldenRatio) / division.value);
}
function hypo() {
  return Math.round(Math.sqrt(Math.pow(letterWide()/(4/division.value), 2) +
                              Math.pow(h_ele.value, 2)));
}

// generating a set of coordinates
// quantity =  hypotenuse / (radius*2)
/*

*/
function newPoint() {
  var r;
  var min = 6;
  var max = 10;
  var i = 0;
  var poo;
  for (;i<quantity; i++) {
    r = Math.floor(Math.random()*(max - min) + min);
    poo = new Points(h_ele.value, division.value, r);
    poo.setX2(poo.x + (6 * i));
    poo.setY2(poo.getX2());
    board.innerHTML = board.innerHTML + poo.calCoodrs() + ", " ;
  }
//  p.preview();
  w_ele.value = poo.getWidth();
  slp.innerHTML = poo.getSlope();
  console.log(hypo());
}

function Points(_h, _dis, _r) {
  this.h = _h || 93;
  this.dis = _dis;
  this.w = letterWide();     // full = 150
  this.radi = _r;
  // Known coordinates
  this.x = 0;
  this.y = this.h;      // base lower-left corner
  this.x1 = this.w / (4/this.dis);
  this.y1 = 0;
  this.slope = Module.dot2((this.y - this.y1)/(this.x - this.x1));
  this.hypotenuse = hypo();
  // unkonwn coordinates
  this.x2 = 0;
  this.y2 = 0;
}
Points.prototype.setY2 = function(_x2) {
  // Given a x2 to calculate y2
  // return a coordinate that's on the slope
  this.y2 =  Math.round(this.y - (this.x - _x2) * this.slope);
}
// how wide this letter is
//Points.prototype.letterWide = function() {
//  return Math.round((this.h * GoldenRatio) / this.dis);
//}
// length of hypotenuse(aka slope)
//Points.prototype.hypo = function() {
//  return Math.round(Math.sqrt(Math.pow(this.x1, 2) + Math.pow(this.h, 2)));
//}
Points.prototype.getY2 = function() {
  // Given a x2 to calculate y2
  // return a coordinate that's on the slope
  return this.y2;
}
Points.prototype.setX2 = function(_x2) {
  // Given a x2 to calculate y2
  // return a coordinate that's on the slope
  this.x2 = _x2;
}
Points.prototype.getX2 = function() {
  // Given a x2 to calculate y2
  // return a coordinate that's on the slope
  return this.x2;
}
Points.prototype.getSlope = function() {
  return this.slope;
}

// display height on the page
Points.prototype.getWidth = function() {
  return this.w;
}
// get the calculated unkonwn coordinates
Points.prototype.calCoodrs = function() {
  return '[' + this.getX2() + ',' + this.getY2() + ',' + this.radi + ']';
}
Points.prototype.preview = function() {
  var pre = 'this.x: ' + this.x + '\n' +
            'this.y: ' + this.y + '\n' +
            'this.x1: ' + this.x1 + '\n' +
            'this.y1: ' + this.y1 + '\n' +
            '(' + this.y1 +  '-' + this.y + ')' + '/' +
            '(' + this.x1 +  '-' + this.x + ')';
  console.log(pre);
}
