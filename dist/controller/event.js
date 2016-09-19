// register mouse event
// get mouse's coordinates
var Mouse = {
  x: 0,
  y: 0,
  move: 'mousemove',
  over: 'mouseover',
  event: {},
};

Mouse.event.movement = function(cvs) {
  // register mouse move event
  cvs.addEventListener(Mouse.move, function(event) {
    Mouse.setMousePos(event);
    Mouse.getMousePos();
  }, false);
};
Mouse.event.over = function(cvs) {
  cvs.addEventListener(Mouse.over, function() {
    // wiggle animation here;
    Animation.wiggle();
  }, false)
}
Mouse.setMousePos = function(evt) {
  Mouse.x = evt.offsetX;
  Mouse.y = evt.offsetY;
};
Mouse.getMousePos = function() {
  console.log('x: ' + Mouse.x + ' y: ' + Mouse.y);
};
