// register mouse event
// get mouse's coordinates
var Mouse = {
  x: 0,
  y: 0,
  ir: 60,
  move: 'mousemove',
  over: 'mouseover',
  out : 'mouseout',
  event: {},
};

Mouse.event.movement = function(cvs) {
  // register mouse move event
  cvs.addEventListener(Mouse.move, function(event) {
    Mouse.setMousePos(event);
    Mouse.getMousePos();
  }, false);
};

// starting wiggle animation
Mouse.event.over = function(cvs) {
  cvs.addEventListener(Mouse.over, wiggleCallbk, false);
};
function wiggleCallbk() {
  BubbleName.draw();
  rAF_id = rAF(wiggleCallbk);
}

// cancel wiggle animation
Mouse.event.out = function(cvs) {
  cvs.addEventListener(Mouse.out, function(event) {
    window.cAF(rAF_id);
  }, false);
};

Mouse.setMousePos = function(evt) {
  Mouse.x = evt.offsetX;
  Mouse.y = evt.offsetY;
};
Mouse.getMousePos = function() {
  //console.log('x: ' + Mouse.x + ' y: ' + Mouse.y);
};
