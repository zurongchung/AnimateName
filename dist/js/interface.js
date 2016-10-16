'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const $ = document.querySelector.bind(document);
//const css = (el,prop) => parseInt(window.getComputedStyle(el).getPropertyValue(prop));

var $ = function $(prop) {
  var el = document.querySelector(prop);
  return new Selector(el);
};

var Selector = function () {
  function Selector(element) {
    _classCallCheck(this, Selector);

    this.el = element;
  }

  _createClass(Selector, [{
    key: 'css',
    value: function css(cssProp) {
      // add a type check for the property provided => String
      if (typeof cssProp != "string") throw TypeError('Not a string');
      return parseInt(window.getComputedStyle(this.el).getPropertyValue(cssProp));
    }
  }, {
    key: 'self',
    get: function get() {
      return this.el;
    }
  }]);

  return Selector;
}();

var Interface = function () {
  function Interface() {
    _classCallCheck(this, Interface);
  }

  _createClass(Interface, [{
    key: 'toggle',
    value: function toggle() {
      var panel = $('.hidden-box');
      var classname = '';
      var state = panel.css('top');
      if (state != 0) {
        panel.self.classList.remove('hide');
        classname = 'show';
      } else {
        panel.self.classList.remove('show');
        classname = 'hide';
      }
      panel.self.style.left = (document.documentElement.clientWidth - panel.css('width')) / 2 + 'px';
      panel.self.classList.add(classname);
    }
  }, {
    key: 'on',
    value: function on() {
      $('#switch').self.addEventListener('click', this.toggle, false);
    }
  }]);

  return Interface;
}();

new Interface().on();