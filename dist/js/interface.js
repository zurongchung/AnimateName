'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const $ = document.querySelector.bind(document);
//const css = (el,prop) => parseInt(window.getComputedStyle(el).getPropertyValue(prop));
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