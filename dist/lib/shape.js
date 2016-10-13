"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function Shape(x, y, c) {
  _classCallCheck(this, Shape);

  this.x = x;
  this.y = y;
  this.color = c;
  this.origx = x;
  this.origy = y;
  this.direction = null;
  this.velocity = new Vector(0.0, 0.0);
};

var Circle = function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle(x, y, c, r) {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, x, y, c));

    _this.r = r;
    _this.start = 0;
    _this.end = Math.PI * 2;
    _this.acw = false;
    return _this;
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw(ctx) {
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, this.start, this.end, this.acw);
      if (s != 0) {
        ctx.strokeStyle = this.color;
        ctx.stroke();
      } else {
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      ctx.closePath();
    }
  }]);

  return Circle;
}(Shape);

var Square = function (_Shape2) {
  _inherits(Square, _Shape2);

  function Square(x, y, c, s) {
    _classCallCheck(this, Square);

    var _this2 = _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this, x, y, c));

    _this2.w = s;
    _this2.h = s;
    return _this2;
  }

  _createClass(Square, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }]);

  return Square;
}(Shape);