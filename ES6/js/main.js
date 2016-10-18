document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded...');
  /*
   * Check canvas support */
   if (!Modernizr.canvas) return;
  const render = new Render();
  render.init();
  render.render();
  window.onresize = () => {render.refresh();}
});
