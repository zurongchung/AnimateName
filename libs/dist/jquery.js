"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    key: "css",
    value: function css(cssProp) {
      // add a type check for the property provided => String
      if (typeof cssProp != "string") throw TypeError('Not a string');
      return parseInt(window.getComputedStyle(this.self).getPropertyValue(cssProp));
    }
    /**
     * Event listener
     * Bubbles up throughs the DOM:
     *  => default is  `false`
     */

  }, {
    key: "listenTo",
    value: function listenTo(type, callback) {
      var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.self.addEventListener(type, function (event) {
        callback(event);
      }, bubbles);
    }
  }, {
    key: "self",
    get: function get() {
      return this.el;
    }
  }]);

  return Selector;
}();