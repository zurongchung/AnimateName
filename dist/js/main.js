
function start() {
  BubbleName.draw();
  // Attach mouse event to canvas
  Mouse.event.movement(canvas);
  Mouse.event.over(canvas);
  Mouse.event.out(canvas);
}
window.onload = start();
