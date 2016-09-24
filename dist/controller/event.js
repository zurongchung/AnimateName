// register mouse event
// get mouse's coordinates
var Mouse = {
  ir: 180,
  ang: 0,
  theta: 0,
  dx: 0,
  dy: 0,
  angle_incre : 0.01,
  x: 0,
  y: 0,
  preX: 0,
  preY: 0,
  icx: 0,
  icy: 0,
  move: 'mousemove',
  over: 'mouseover',
  out : 'mouseout',
  up  : 'mouseup',
  down: 'mousedown',
  event: {},
  area: function() {
    return Math.floor(Math.PI * Math.pow(Mouse.ir, 2));
  },
};

Mouse.event.down = function () {
  // for alphabet maker
  canvas.addEventListener(Mouse.down, makerStart, false);
};
Mouse.event.up = function () {
  canvas.addEventListener(Mouse.up, function(){
    canvas.removeEventListener(Mouse.move, makerDraw, false);
  }, false);

};

// detect mouse is ready to draw
// mouse click event
function makerStart(event) {
  // after mouse is down.
  // Start drawing
  Mouse.setMousePos(event);   // avoid Mouse.x and y is at 0 when first movement
  Maker.draw(); // draw a circle when mouse down
  canvas.addEventListener(Mouse.move, makerDraw, false)

}
// for drawing `mousemove` event
function makerDraw(event) {
  Mouse.setMousePos(event);
  Maker.draw();
}

Mouse.event.movement = function(cvs) {
  // register mouse move event
  cvs.addEventListener(Mouse.move, moveCallbk, false);

};
function moveCallbk(event) {
  Mouse.setMousePos(event);
  BubbleName.resetCanvas();
  var bounce = new Animation(BubbleName.w, BubbleName.h, BubbleName.charAt(),
  BubbleName.count(), BubbleName.hex().length);
  bounce.draw();
  // mouse animation # test_del
  Mouse.drawInvisible();
  Mouse.update(Mouse.ang);
  rAF_id = rAF(wiggleCallbk);
}
// starting wiggle animation
Mouse.event.over = function(cvs) {
  cvs.addEventListener(Mouse.over, wiggleCallbk, false);
};
function wiggleCallbk(event) {
  //BubbleName.draw();
  Mouse.setMousePos(event);   // avoid Mouse.x and y is at 0 when first movement

}

// cancel wiggle animation
Mouse.event.out = function(cvs) {
  cvs.addEventListener(Mouse.out, function(event) {
    window.cAF(rAF_id);
  }, false);
};

Mouse.setMousePos = function(evt) {
  Mouse.preX = Mouse.x;
  Mouse.preY = Mouse.y;
  Mouse.x = evt.offsetX;
  Mouse.y = evt.offsetY;
  Mouse.icx = Mouse.x;
  Mouse.icy = Mouse.y;
};
Mouse.drawInvisible = function() {
  //  BubbleName.resetCanvas(brush);
    // small circle around mouse point
    new Shape(Mouse.icx, Mouse.icy, 7, Color.getClr(2)).draw();


    new Shape().lines(Mouse.icx, Mouse.icy, Mouse.x, Mouse.y);
    // A big circle from center of mouse point
    var bigCircle = new Shape(Mouse.x, Mouse.y, Mouse.ir, Color.getClr(4));
    bigCircle.stroke();
};
//var vx = 5;
//var vy = -25;
//var g = 1;
Mouse.update = function(_ang) {
  Mouse.icx = Math.cos(_ang) * Mouse.ir + Mouse.x;
  Mouse.icy = Math.sin(_ang) * Mouse.ir + Mouse.y;

  // rotate cw or ccw
  Mouse.x > Mouse.preX ? Mouse.ang += Mouse.angle_incre : Mouse.ang -= Mouse.angle_incre;
  //Mouse.icx += vx;
  //Mouse.icy += vy;

  //if (Mouse.icy > 500) {
  //  vy *= -0.5;
  //  vx *= 0.7;
  //  Mouse.icy = 500;
  //}
  //vy += g;
};
