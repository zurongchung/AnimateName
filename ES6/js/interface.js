//const $ = document.querySelector.bind(document);
//const css = (el,prop) => parseInt(window.getComputedStyle(el).getPropertyValue(prop));

const $ = prop => {
  const el = document.querySelector(prop);
  return new Selector(el);
}
class Selector{
  constructor(element) {
    this.el = element;
  }
  get self() {
    return this.el;
  }
  css(cssProp) {
    // add a type check for the property provided => String
   if (typeof cssProp != "string") throw TypeError('Not a string');
   return parseInt(window.getComputedStyle(this.el).getPropertyValue(cssProp));
 }
}

class Interface {
  constructor() {

  }
  toggle() {
    const panel = $('.hidden-box');
    let classname = '';
    let state = panel.css('top');
    if (state != 0) {
      panel.self.classList.remove('hide');
      classname = 'show';
    }else {
      panel.self.classList.remove('show');
      classname = 'hide';
    }
    panel.self.style.left = `${(document.documentElement.clientWidth -
      panel.css('width'))/2}px`;
    panel.self.classList.add(classname);
  }
  on() {
    $('#switch').self.addEventListener('click', this.toggle, false);
  }

}
new Interface().on();
