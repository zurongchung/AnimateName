/*
#  HERE is the equation to find any coordinates on the slope of two points
    m = (y2-y1)/(x2-x1)
or  (y2-y1) = (x2-x1)m

By given an Known point(x1,y1) and either given a second x2 or y2
we can calculate the unkonwn and get a new point that's on the slope
*/
var width_element = document.querySelector('input[name="width"]');
var height_element = document.querySelector('input[name="height"]');
var division = document.querySelector('input[name="division"]');
var username = document.querySelector('input[name="username"]');

// display calculated coordinates
var board = document.querySelector('code.coords');
var cls   = document.querySelector('#cls');
var get   = document.querySelector('#getPoints');

// alphabet to charcode
var at = document.querySelector('.ccode');
var letter = document.querySelector('input[name="letter"]');


// Attach event listener
letter.addEventListener('keyup', atoCode, false);
letter.addEventListener('click', clear, false);
cls.addEventListener('click', clsBoard, false);
username.addEventListener('keyup', BubbleName.redraw, false);

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
  // clear shifted points
  Maker.clearCollectPoint();
  // clear canvas
  BubbleName.draw(1);
}

function hypo() {
  return Math.round(Math.sqrt(Math.pow(Maker.letterWide()/(4/division.value), 2) +
                              Math.pow(height_element.value, 2)));
}
