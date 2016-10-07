"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*---------------
 * Color Themes
 *----------------*/

var Theme = function () {
  function Theme() {
    _classCallCheck(this, Theme);

    this.theme = new Map(this.colors);
    this.length = this.theme.size;
  }

  _createClass(Theme, [{
    key: "colors",
    get: function get() {
      return [[1, [174, 218, 75]], // green
      [2, [12, 144, 209]], // Preface Isolation
      [3, [206, 53, 0]], // Aviation Orange
      [4, [198, 12, 209]], // Oxygen Tank Green
      [5, [106, 12, 209]], // ghostwriter, primary
      [6, [24, 208, 175]]];
    }
  }]);

  return Theme;
}();