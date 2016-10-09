const $ = document.querySelector.bind(document);
const css = (el,prop) => parseInt(window.getComputedStyle(el).getPropertyValue(prop));

class Interface {
  constructor() {

  }
  toggle() {
    const panel = $('.hidden-box');
    let classname = '';
    let state = css(panel, 'top');
    if (state != 0) {
      panel.classList.remove('hide');
      classname = 'show';
    }else {
      panel.classList.remove('show');
      classname = 'hide';
    } 
    panel.style.left = `${(document.documentElement.clientWidth -css(panel, 'width'))/2}px`;
    panel.classList.add(classname);
  }
  on() {
    $('#switch').addEventListener('click', this.toggle, false);
  }

}
class Ctrlpanel extends Interface {
  constructor() {
    super();
  }

}
new Interface().on();
