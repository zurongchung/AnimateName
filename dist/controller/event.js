// register mouse event
// get mouse's coordinates
var Mouse = {
  ir: 120,
  ang: 0,
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
  event: {},
  area: function() {
    return Math.floor(Math.PI * Math.pow(Mouse.ir, 2));
  },
};

Mouse.event.movement = function(cvs) {
  // register mouse move event
  cvs.addEventListener(Mouse.move, moveCallbk, false);
};

function moveCallbk(event) {
  Mouse.setMousePos(event);
  //Mouse.update(Mouse.ang);
}
// starting wiggle animation
Mouse.event.over = function(cvs) {
  cvs.addEventListener(Mouse.over, wiggleCallbk, false);
};
function wiggleCallbk() {
  //BubbleName.draw();
  Mouse.drawInvisible();
  Mouse.update(Mouse.ang);
  rAF_id = rAF(wiggleCallbk);
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
    BubbleName.resetCanvas(brush);
    var circle = new Circle(Mouse.icx, Mouse.icy,
                Letter.getRadi(65, 1), Color.getClr(2));
    circle.draw();

};
Mouse.update = function(_ang) {
  Mouse.icx = Math.cos(_ang)*Mouse.ir + Mouse.x;
  Mouse.icy = Math.sin(_ang)*Mouse.ir + Mouse.y;
  Mouse.x > Mouse.preX ? Mouse.ang += Mouse.angle_incre : Mouse.ang -= Mouse.angle_incre;
};
