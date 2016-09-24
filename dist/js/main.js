
function start() {
  BubbleName.draw();
  // Attach mouse event to canvas
  //Mouse.event.movement(canvas);
  //Mouse.event.over(canvas);
  //Mouse.event.out(canvas);

  // make alphabet
  //BubbleName.resetCanvas();
  Mouse.event.down();
  Mouse.event.up();
  Maker.copy();

}
window.onload = start();
