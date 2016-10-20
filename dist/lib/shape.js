'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function Shape(x, y, z, c) {
  _classCallCheck(this, Shape);

  this.color = c;
  this.mass = z;
  this.curPos = new Vector(x, y, z);
  this.originalPos = new Vector(x, y, z);
  this.targetPos = new Vector(x, y);
  this.velocity = new Vector(0.0, 0.0);
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
  }, {
    key: 'update',
    value: function update() {
      var strength = document.springStrength;
      var _ref = [document.friction, document.rotationForce];
      var friction = _ref[0];
      var rotationFroce = _ref[1];
      var dx = this.targetPos.x - this.curPos.x;
      var dy = this.targetPos.y - this.curPos.y;

      var ax = dx / this.mass - rotationFroce * dy;
      var ay = dy / this.mass + rotationFroce * dx;
      //console.log(rotationFroce)
      this.velocity.x += ax;
      this.velocity.x -= this.velocity.x * friction;
      this.curPos.x += this.velocity.x;

      this.velocity.y += ay;
      this.velocity.y -= this.velocity.y * friction;
      this.curPos.y += this.velocity.y;
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
    _this3.t = 0.2;
    _this3.speed = 0.1;
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
  }, {
    key: 'update',
    value: function update(ctx) {
      if (this.t >= 1 || this.t < 0) this.speed *= -1;
      this.speed -= this.speed * 0.01;
      this.t += this.speed;
      // point on the line same as starting point
      var qx = (1 - this.t) * this.x + this.t * this.cpx;
      var qy = (1 - this.t) * this.y + this.t * this.cpy;
      // point on curve tangent line
      var rx = (1 - this.t) * this.cpx + this.t * this.cp1x;
      var ry = (1 - this.t) * this.cpy + this.t * this.cp1y;
      // point on the line same as ending point
      var sx = (1 - this.t) * this.cp1x + this.t * this.ex;
      var sy = (1 - this.t) * this.cp1y + this.t * this.ey;

      // line connect three points above
      new Line(qx, qy, rx, ry, 'rgb(44, 122, 185)').draw(ctx);
      new Line(rx, ry, sx, sy, 'rgb(44, 122, 185)').draw(ctx);

      // point on the first moving line
      var ax = (1 - this.t) * qx + this.t * rx;
      var ay = (1 - this.t) * qy + this.t * ry;
      // point on the second moving line
      var fx = (1 - this.t) * rx + this.t * sx;
      var fy = (1 - this.t) * ry + this.t * sy;

      // line for the tip lies on
      new Line(ax, ay, fx, fy, 'rgb(186, 57, 68)').draw(ctx);
      // point of the tip
      var Gx = (1 - this.t) * ax + this.t * fx;
      var Gy = (1 - this.t) * ay + this.t * fy;

      // tip of the pen
      new Circle(Gx, Gy, 7, 'rgb(183, 228, 33)').draw(ctx);
    }
  }]);

  return Cubic;
}(Curve);