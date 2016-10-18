'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function Shape(x, y, z, c) {
  _classCallCheck(this, Shape);

  this.color = c;
  this.curPos = new Vector(x, y, z);
  this.originalPos = new Vector(x, y, z);
  this.v = new Vector(0.0, 0.0);
};

var Circle = function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle(x, y, z, c) {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, x, y, z, c));

    _this.radius = z;
    _this.start = 0;
    _this.end = Math.PI * 2;
    _this.acw = false;
    return _this;
  }

  _createClass(Circle, [{
    key: 'draw',
    value: function draw(ctx) {
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      ctx.beginPath();
      ctx.arc(this.curPos.x, this.curPos.y, this.radius, this.start, this.end, this.acw);
      if (s != 0) {
        ctx.lineWidth = 1;
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

  function Square(x, y, z, c) {
    _classCallCheck(this, Square);

    var _this2 = _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this, x, y, z, c));

    _this2.w = z;
    _this2.h = z;
    return _this2;
  }

  _createClass(Square, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.curPos.x, this.curPos.y, this.w, this.h);
    }
  }]);

  return Square;
}(Shape);

var Line = function () {
  function Line(x, y, ex, ey) {
    var c = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'cyan';

    _classCallCheck(this, Line);

    this.x = x;
    this.y = y;
    this.ex = ex;
    this.ey = ey;
    this.color = c;
  }

  _createClass(Line, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.ex, this.ey);
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }]);

  return Line;
}();

var Curve = function Curve(x, y, cpx, cpy, ex, ey) {
  var c = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'orange';

  _classCallCheck(this, Curve);

  this.x = x;
  this.y = y;
  this.ex = ex;
  this.ey = ey;
  this.cpx = cpx;
  this.cpy = cpy;
  this.color = c;
};

var Cubic = function (_Curve) {
  _inherits(Cubic, _Curve);

  function Cubic(x, y, cpx, cpy, cp1x, cp1y, ex, ey, c) {
    _classCallCheck(this, Cubic);

    var _this3 = _possibleConstructorReturn(this, (Cubic.__proto__ || Object.getPrototypeOf(Cubic)).call(this, x, y, cpx, cpy, ex, ey, c));

    _this3.cp1x = cp1x;
    _this3.cp1y = cp1y;
    return _this3;
  }

  _createClass(Cubic, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.bezierCurveTo(this.cpx, this.cpy, this.cp1x, this.cp1y, this.ex, this.ey);
      ctx.lineWidth = 4;
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }]);

  return Cubic;
}(Curve);