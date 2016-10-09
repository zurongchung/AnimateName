'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*---------------
 * Color Themes
 *----------------*/

var Theme = function () {
  function Theme() {
    _classCallCheck(this, Theme);

    this.color = new Map(this.theme);
  }

  _createClass(Theme, [{
    key: 'rgb',
    value: function rgb(index) {
      var values = this.color.get(index);
      return 'rgb(' + values.join(',') + ')';
    }
  }, {
    key: 'theme',
    get: function get() {
      return [[0, [174, 218, 75]], // green
      [1, [12, 144, 209]], // Preface Isolation
      [2, [206, 53, 0]], // Aviation Orange
      [3, [198, 12, 209]], // Oxygen Tank Green
      [4, [106, 12, 209]], // ghostwriter, primary
      [5, [24, 208, 175]]];
    }
  }, {
    key: 'length',
    get: function get() {
      return this.color.size;
    }
  }]);

  return Theme;
}();