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
  // mouse button
  lm: 0,
  rm: 2,
  move: 'mousemove',
  over: 'mouseover',
  out : 'mouseout',
  up  : 'mouseup',
  down: 'mousedown',
  keydown: 'keydown',
  incre: '[',
  decre: ']',
  event: {},
  area: function() {
    return Math.floor(Math.PI * Math.pow(Mouse.ir, 2));
  },
};
/*------------------
      Drawing
--------------------*/
Mouse.event.keydown = function () {
  window.addEventListener(Mouse.keydown, Maker.changeRadius, false);
};

Mouse.event.down = function () {
  // for alphabet maker
  canvas.addEventListener(Mouse.down, makerStart, false);
};
Mouse.event.up = function () {
  canvas.addEventListener(Mouse.up, stopDrawEvent, false);

};
Mouse.event.drawOutOfCanvas = function () {
  canvas.addEventListener(Mouse.out, stopDrawEvent, false);
};
function stopDrawEvent() {
  canvas.removeEventListener(Mouse.move, makerDraw, false);
  canvas.removeEventListener(Mouse.move, makerErase, false);

};
// detect mouse is ready to draw
// mouse click event
function makerStart(event) {
  if (event.button === 0) {
    // after mouse left button is clicked.
    // Start drawing
    Mouse.setMousePos(event);   // avoid Mouse.x and y is at 0 when first movement
    Maker.draw(); // draw a circle when mouse down
    canvas.addEventListener(Mouse.move, makerDraw, false);
  }else if (event.button === 2) {
    Mouse.setMousePos(event)
    // remove that coordinate from list
    Maker.redraw();
    canvas.addEventListener(Mouse.move, makerErase, false);
  }


}
// for drawing `mousemove` event
function makerDraw(event) {
  Mouse.setMousePos(event);
  Maker.draw();
}
function makerErase(event) {
  Mouse.setMousePos(event);
  Maker.redraw();
}

/*------------------
      Animations
--------------------*/

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

// cancel bounce animation
Mouse.event.out = function(cvs) {
  cvs.addEventListener(Mouse.out, stopAnimation, false);
};
function stopAnimation() {
  window.cAF(rAF_id);
}

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

Mouse.cancleDesignMode = function () {
  // remove all event listener for design section
  canvas.removeEventListener(Mouse.keydown, Maker.changeRadius,false);
  canvas.removeEventListener(Mouse.down, makerStart,false);
  canvas.removeEventListener(Mouse.up, stopDrawEvent,false);
  canvas.removeEventListener(Mouse.out, stopDrawEvent,false);
};
Mouse.cancleProductionMode = function () {
  // remove all event listener for production view
  //canvas.removeEventListener(Mouse.over, wiggleCallbk, false);
  canvas.removeEventListener(Mouse.move, moveCallbk, false);
  canvas.removeEventListener(Mouse.out, stopAnimation, false);

};
