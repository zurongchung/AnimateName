
var designMode = document.querySelector("input[type='checkbox']");
designMode.addEventListener('click', changeMode, false);
window.onload = changeMode();
function start() {
  Mouse.event.movement(canvas);
  Mouse.event.over(canvas);
  Mouse.event.out(canvas);
}

function changeMode(_inDesign = 0) {
  // remove all designMode listener before enter
  // production view
  var hasDesignEventListener = 0; // false
  if (designMode.checked) {
    Mouse.cancleProductionMode();
    _inDesign = 1;
    hasDesignEventListener = 0;
    BubbleName.draw(_inDesign);
    Maker.designMode();
 }else {
   if (hasDesignEventListener) {Mouse.cancleDesignMode();}

   BubbleName.draw();
   start();
 }
}
