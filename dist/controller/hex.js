"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Turn characters into UTF-16/hex code representing each letter
 * Return a series number representing that phrase in String format
 */

var Hex = function () {
  function Hex(phrase) {
    _classCallCheck(this, Hex);

    this.phrase = phrase;
  }

  _createClass(Hex, [{
    key: "convertToUTF16",
    value: function convertToUTF16() {
      // => Array
      var hexcodes = new Array();
      for (var i = 0; i < this.length; i++) {
        hexcodes.push(this.phrase.charCodeAt(i));
      }
      return hexcodes;
    }
  }, {
    key: "length",
    get: function get() {
      return this.phrase.length;
    }
  }, {
    key: "hex",
    get: function get() {
      /*
       *  return hex codes array represent the phrase
       *  to the requestor
       */
      return this.convertToUTF16();
    }
  }]);

  return Hex;
}();