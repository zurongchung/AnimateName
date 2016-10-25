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