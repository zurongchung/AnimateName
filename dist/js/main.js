'use strict';

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded...');
  var render = new Render();
  render.init();
  render.render();
  window.onresize = function () {
    render.refresh();
  };
});