document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded...');
  const render = new Render();
  render.init();
  render.render();
  window.onresize = () => {render.refresh();}
});
