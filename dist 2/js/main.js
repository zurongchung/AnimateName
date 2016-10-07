
var designMode = document.querySelector("input[type='checkbox']");
designMode.addEventListener('click', changeMode, false);

// remove all designMode listener before enter
// production view
var hasDesignEventListener = 0; // false

window.onload = changeMode;
function start() {
  Event.Mouse.event.movement(canvas);
  Event.Mouse.event.over(canvas);
  Event.Mouse.event.out(canvas);
}

function changeMode() {
  if (designMode.checked) {
    Event.exitProductionMode();
    hasDesignEventListener = 1; // true
    BubbleName.draw(1);
    Maker.designMode();
    get.disabled = false;
    get.addEventListener('click', generatePoints, false);
 }else {
   if (hasDesignEventListener) {Event.exitDesignMode();}
   BubbleName.draw();
   start();
 }
}