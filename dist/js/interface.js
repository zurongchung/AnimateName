'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = document.querySelector.bind(document);
var css = function css(el, prop) {
  return parseInt(window.getComputedStyle(el).getPropertyValue(prop));
};

var Interface = function () {
  function Interface() {
    _classCallCheck(this, Interface);
  }

  _createClass(Interface, [{
    key: 'toggle',
    value: function toggle() {
      var panel = $('.hidden-box');
      var classname = '';
      var state = css(panel, 'top');
      if (state != 0) {
        panel.classList.remove('hide');
        classname = 'show';
      } else {
        panel.classList.remove('show');
        classname = 'hide';
      }
      panel.style.left = (document.documentElement.clientWidth - css(panel, 'width')) / 2 + 'px';
      panel.classList.add(classname);
    }
  }, {
    key: 'on',
    value: function on() {
      $('#switch').addEventListener('click', this.toggle, false);
    }
  }]);

  return Interface;
}();

var Ctrlpanel = function (_Interface) {
  _inherits(Ctrlpanel, _Interface);

  function Ctrlpanel() {
    _classCallCheck(this, Ctrlpanel);

    return _possibleConstructorReturn(this, (Ctrlpanel.__proto__ || Object.getPrototypeOf(Ctrlpanel)).call(this));
  }

  return Ctrlpanel;
}(Interface);

new Interface().on();