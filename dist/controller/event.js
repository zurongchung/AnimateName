// register mouse event
// get mouse's coordinates
var Mouse = {
  x: 0,
  y: 0,
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
  cvs.addEventListener(Mouse.over, function(event) {
    // wiggle animation here;
    //console.log('----------------');
    var shake = new Animation();
    shake.wiggle(event.type);
  }, false);
};

// cancel wiggle animation
Mouse.event.out = function(cvs) {
  cvs.addEventListener(Mouse.out, function(event) {
    console.log(event.type);
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
