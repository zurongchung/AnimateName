'use strict';

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded...');
  /*
   * Check canvas support */
  if (!Modernizr.canvas) return;
  var render = new Render();
  render.init();
  render.render();
  window.onresize = function () {
    render.refresh();
  };
});