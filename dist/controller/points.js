"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Gather Points that forms our words
 */
var Point = function () {
  function Point(pos) {
    _classCallCheck(this, Point);

    this.pos = pos;
    this.letter = Alphabet["A" + this.pos];
  }

  _createClass(Point, [{
    key: "point",
    value: function point(index) {
      return this.letter.p[index];
    }
  }, {
    key: "x",
    value: function x(index) {
      return this.letter.p[index][0];
    }
  }, {
    key: "y",
    value: function y(index) {
      return this.letter.p[index][1];
    }
  }, {
    key: "radius",
    value: function radius(index) {
      return this.letter.p[index][2];
    }
  }, {
    key: "tone",
    value: function tone(index) {
      return this.letter.p[index][3];
    }
  }, {
    key: "manyPoints",
    get: function get() {
      return this.letter.p.length;
    }
  }, {
    key: "width",
    get: function get() {
      return this.letter.w;
    }
  }]);

  return Point;
}();