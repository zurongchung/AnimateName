
function start() {
  BubbleName.draw();
  // Attach mouse event to canvas
  //Mouse.event.movement(canvas);
  //Mouse.event.over(canvas);
  //Mouse.event.out(canvas);

  // make alphabet
  Mouse.event.down();
  Mouse.event.up();
  Mouse.event.drawOutOfCanvas();
  Maker.copy();
  document.oncontextmenu = function () { // Use document as opposed to window for IE8 compatibility
   return false;
};
}
window.onload = start();
