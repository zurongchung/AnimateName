"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Gather Points that forms our words
 */
var Point = function () {
  function Point(pos) {
    _classCallCheck(this, Point);

    this.pos = "A" + pos;
    var _Alphabet = Alphabet;
    var _Alphabet$pos = _Alphabet[this.pos];
    var w = _Alphabet$pos.w;
    var p = _Alphabet$pos.p;

    this.w = w;
    this.setOfPoint = p;
  }

  _createClass(Point, [{
    key: "x",
    value: function x(index) {
      return this.point[index][0];
    }
  }, {
    key: "y",
    value: function y(index) {
      return this.point[index][1];
    }
  }, {
    key: "radius",
    value: function radius(index) {
      return this.point[index][2];
    }
  }, {
    key: "tone",
    value: function tone(index) {
      return this.point[index][3];
    }
  }, {
    key: "manyPoints",
    get: function get() {
      return this.points.length;
    }
  }, {
    key: "width",
    get: function get() {
      return this.w;
    }
  }, {
    key: "height",
    get: function get() {
      return Math.floor(this.w / 1.618);
    }
  }, {
    key: "points",
    get: function get() {
      return this.setOfPoint;
    }
  }]);

  return Point;
}();