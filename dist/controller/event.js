// register mouse event
// get mouse's coordinates
var Event = {
  Mouse: {
    ir: 180,
    ang: 0,
    theta: 0,
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
    event: {
      type: {
        move: 'mousemove',
        over: 'mouseover',
        out : 'mouseout',
        up  : 'mouseup',
        down: 'mousedown',
      },
    },

  },
  Keyboard: {
    event: {
        type: {
        keydown: 'keydown',
      },
    },
    key: {
      incre: '[',
      decre: ']',
    },
  },
  area: function() {
    return Math.floor(Math.PI * Math.pow(this.Mouse.ir, 2));
  },
};
/*------------------
      Drawing
--------------------*/
Event.Keyboard.event.keydown = function () {
  window.addEventListener(Event.Keyboard.event.type.keydown, Maker.changeRadius, false);
};

Event.Mouse.event.down = function () {
  // for alphabet maker
  canvas.addEventListener(Event.Mouse.event.type.down, makerStart, false);
};
Event.Mouse.event.up = function () {
  canvas.addEventListener(Event.Mouse.event.type.up, stopDrawEvent, false);

};
Event.Mouse.event.drawOutOfCanvas = function () {
  canvas.addEventListener(Event.Mouse.event.type.out, stopDrawEvent, false);
};
function stopDrawEvent() {
  canvas.removeEventListener(Event.Mouse.event.type.move, makerDraw, false);
  canvas.removeEventListener(Event.Mouse.event.type.move, makerErase, false);

};
// detect mouse is ready to draw
// mouse click event
function makerStart(event) {
  if (event.button === 0) {
    // after mouse left button is clicked.
    // Start drawing
    Event.Mouse.setMousePos(event);   // avoid Mouse.x and y is at 0 when first movement
    Maker.draw(); // draw a circle when mouse down
    canvas.addEventListener(Event.Mouse.event.type.move, makerDraw, false);
  }else if (event.button === 2) {
    Event.Mouse.setMousePos(event)
    // remove that coordinate from list
    Maker.redraw();
    canvas.addEventListener(Event.Mouse.event.type.move, makerErase, false);
  }


}
// for drawing `mousemove` event
function makerDraw(event) {
  Event.Mouse.setMousePos(event);
  Maker.draw();
}
function makerErase(event) {
  Event.Mouse.setMousePos(event);
  Maker.redraw();
}

/*------------------
      Animations
--------------------*/

Event.Mouse.event.movement = function(cvs) {
  // register mouse move event
  cvs.addEventListener(Event.Mouse.event.type.move, moveCallbk, false);

};
function moveCallbk(event) {
  Event.Mouse.setMousePos(event);
  BubbleName.resetCanvas();
  var bounce = new Animation(BubbleName.w, BubbleName.h, BubbleName.charAt(),
  BubbleName.numOfLetters(), BubbleName.spacing);
  bounce.draw();
  // mouse animation # test_del
  Event.Mouse.drawInvisible();
  Event.Mouse.update(Event.Mouse.ang);
  rAF_id = rAF(wiggleCallbk);
}
// starting wiggle animation
Event.Mouse.event.over = function(cvs) {
  cvs.addEventListener(Event.Mouse.event.type.over, wiggleCallbk, false);
};
function wiggleCallbk(event) {
  //BubbleName.draw();
  Event.Mouse.setMousePos(event);   // avoid Mouse.x and y is at 0 when first movement
}

// cancel bounce animation
Event.Mouse.event.out = function(cvs) {
  cvs.addEventListener(Event.Mouse.event.type.out, stopAnimation, false);
};
function stopAnimation() {
  window.cAF(rAF_id);
}

Event.Mouse.setMousePos = function(evt) {
  Event.Mouse.preX = Event.Mouse.x;
  Event.Mouse.preY = Event.Mouse.y;
  Event.Mouse.x = evt.offsetX;
  Event.Mouse.y = evt.offsetY;
  Event.Mouse.icx = Event.Mouse.x;
  Event.Mouse.icy = Event.Mouse.y;
};
Event.Mouse.drawInvisible = function() {
  //  BubbleName.resetCanvas(brush);
    // small circle around mouse point
    new Shape(Event.Mouse.icx, Event.Mouse.icy, 7, Color.getClr(2)).draw();


    new Shape().lines(Event.Mouse.icx, Event.Mouse.icy, Event.Mouse.x, Event.Mouse.y);
    // A big circle from center of mouse point
    var bigCircle = new Shape(Event.Mouse.x, Event.Mouse.y, Event.Mouse.ir, Color.getClr(4));
    bigCircle.stroke();
};

Event.Mouse.update = function(_ang) {
  Event.Mouse.icx = Math.cos(_ang) * Event.Mouse.ir + Event.Mouse.x;
  Event.Mouse.icy = Math.sin(_ang) * Event.Mouse.ir + Event.Mouse.y;

  // rotate cw or ccw
  Event.Mouse.x > Event.Mouse.preX ? Event.Mouse.ang += Event.Mouse.angle_incre : Event.Mouse.ang -= Event.Mouse.angle_incre;
  //Event.Mouse.icx += vx;
  //Event.Mouse.icy += vy;

  //if (Event.Mouse.icy > 500) {
  //  vy *= -0.5;
  //  vx *= 0.7;
  //  Event.Mouse.icy = 500;
  //}
  //vy += g;
};

Event.exitDesignMode = function () {
  // remove all event listener for design section
  window.removeEventListener(Event.Keyboard.event.type.keydown, Maker.changeRadius,false);
  canvas.removeEventListener(Event.Mouse.event.type.down, makerStart,false);
  canvas.removeEventListener(Event.Mouse.event.type.up, stopDrawEvent,false);
  canvas.removeEventListener(Event.Mouse.event.type.out, stopDrawEvent,false);
  canvas.oncontextmenu = function () { return true; };

};
Event.exitProductionMode = function () {
  // remove all event listener for production view
  //canvas.removeEventListener(Event.Mouse.over, wiggleCallbk, false);
  canvas.removeEventListener(Event.Mouse.event.type.move, moveCallbk, false);
  canvas.removeEventListener(Event.Mouse.event.type.out, stopAnimation, false);

};
