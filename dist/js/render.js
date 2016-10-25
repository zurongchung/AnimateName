'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var docElem = document.documentElement;
var RAF = window.requestAnimationFrame;
document.force = 15;
//document.springStrength = 0.1;
document.friction = 0.05;
document.rotationForce = 0.0;
// dots
var t = 0;
var speed = 0.1;
var z = 10;
var p0 = { x: 500, y: 120 };
var cp1 = { x: 680, y: 280 };
var cp2 = { x: 650, y: 550 };
var p1 = { x: 720, y: 420 };

var Viewport = function () {
  function Viewport() {
    _classCallCheck(this, Viewport);

    this.canvas.width = docElem.clientWidth;
    this.canvas.height = docElem.clientHeight;
  }

  _createClass(Viewport, [{
    key: 'resize',
    value: function resize() {
      this.width = docElem.clientWidth;
      this.height = docElem.clientHeight;
    }
  }, {
    key: 'canvas',
    get: function get() {
      return document.getElementById('canvas');
    }
  }, {
    key: 'ctx',
    get: function get() {
      return this.canvas.getContext('2d');
    }
  }, {
    key: 'width',
    get: function get() {
      return this.canvas.width;
    },
    set: function set(val) {
      this.canvas.width = val;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.canvas.height;
    },
    set: function set(val) {
      this.canvas.height = val;
    }
  }]);

  return Viewport;
}();

var Render = function (_Viewport) {
  _inherits(Render, _Viewport);

  function Render() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'circle';

    _classCallCheck(this, Render);

    var _this = _possibleConstructorReturn(this, (Render.__proto__ || Object.getPrototypeOf(Render)).call(this));

    _this.type = type.toLowerCase();
    _this.hgap = 10;
    _this.vgap = 0;
    _this.shapes = [];
    _this.ball = []; // exp bezier

    // Initialize mouse
    _this.mouse = new Vector(9999, 9999);
    _this.radius = 120;
    return _this;
  }

  _createClass(Render, [{
    key: 'draw',
    value: function draw() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.shapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var o = _step.value;

          this.update(o);
          o.draw(this.ctx);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'update',
    value: function update(curObj) {
      /**
       * to -> s The distance in a straight line between center of the mouse 
       * and center of the shape
       */
      var dx = this.mouse.x - curObj.curPos.x;
      var dy = this.mouse.y - curObj.curPos.y;

      var s = Math.sqrt(dx * dx + dy * dy);

      var ss = Math.round(Math.sqrt(Math.pow(curObj.curPos.x - curObj.originalPos.x, 2) + Math.pow(curObj.curPos.y - curObj.originalPos.y, 2)));
      var distance = document.force;

      if (s < this.radius + curObj.radius) {
        var angle = this.mouse.x < curObj.curPos.x ? Math.atan(dy / dx) : Math.PI - Math.atan(dy / dx) * -1;
        var shiftx = Math.cos(angle) * document.force;
        var shifty = Math.sin(angle) * document.force;
        /**
         * setting target position*/
        curObj.targetPos.setPos(curObj.curPos.x + shiftx, curObj.curPos.y + shifty);
        /**
         * to --> distance Is when the shape will going  back to original position
         * if it has been intercept while going towards original position
         * then this distance has to be increase by the remaining distance
         */
        distance += ss;
      }
      if (!s < this.radius + curObj.radius && ss >= distance) {
        curObj.targetPos.setPos(curObj.originalPos.x, curObj.originalPos.y);
      }
      curObj.update();
    }
  }, {
    key: 'init',
    value: function init() {
      // exp bezier
      this.ball.push(new Cubic(p0.x, p0.y, cp1.x, cp1.y, cp2.x, cp2.y, p1.x, p1.y));

      this.listen();
      var theme = new Theme();
      var chars = new Hex('RACG');
      var arrayOfCodes = chars.codes;
      this.alignCenter(chars);

      var colorIndex = 0;
      var space = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = arrayOfCodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var pos = _step2.value;

          var pointGetter = new Point(pos);
          var points = pointGetter.points;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = points[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var p = _step3.value;

              var _p = _slicedToArray(p, 3);

              var x = _p[0];
              var y = _p[1];
              var _z = _p[2];

              this.livings(x + space + this.ofx, y + this.ofy, _z, theme.rgb(colorIndex));
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          space += pointGetter.width + this.hgap;
          colorIndex >= theme.length ? colorIndex = 0 : colorIndex++;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'livings',
    value: function livings(x, y, z, c) {
      /*
       * Save shapes that are appeared on the canvas.
       * An array of shapes that forms our animation.
       */

      if (this.type === 'square') {
        var square = new Square(x, y, z, c);
        //this.square(square);
        this.shapes.push(square);
      } else {
        var circle = new Circle(x, y, z, c);
        //  this.circle(circle);
        this.shapes.push(circle);
      }
    }
  }, {
    key: 'bezier',
    value: function bezier() {
      // visual lines
      new Circle(p0.x, p0.y, z - 4, '#FFF').draw(this.ctx, 1);
      new Circle(p1.x, p1.y, z - 4, '#FFF').draw(this.ctx, 1);
      new Circle(cp1.x, cp1.y, z, '#FFF').draw(this.ctx, 1);
      new Circle(cp2.x, cp2.y, z, '#FFF').draw(this.ctx, 1);

      // line connect control points
      new Line(p0.x, p0.y, cp1.x, cp1.y).draw(this.ctx);
      new Line(cp1.x, cp1.y, cp2.x, cp2.y).draw(this.ctx);
      new Line(cp2.x, cp2.y, p1.x, p1.y).draw(this.ctx);

      // moving ball
      var ball = this.ball[0];
      ball.update(this.ctx);
      ball.draw(this.ctx);
    }
  }, {
    key: 'drawWallpaper',
    value: function drawWallpaper() {
      var _this2 = this;

      var w = 69;
      var h = 100;
      var _ref = [Math.round(this.height / h), Math.round(this.width / w)];
      var row = _ref[0];
      var col = _ref[1];

      var img = new Image();
      img.addEventListener('load', function () {
        for (var i = 0; i < col; i++) {
          for (var r = 0; r < row; r++) {
            _this2.ctx.save();
            _this2.ctx.translate(i * w, r * h);
            _this2.ctx.drawImage(img, 0, 0);
            _this2.ctx.restore();
          }
        }
      }, false);
      img.src = './assets/img/backdrop.png';
    }
  }, {
    key: 'alignCenter',
    value: function alignCenter(char) {
      /*
       *  Centering sentence */
      this.ofx = this.width / 2 - (char.wide + this.hgap * (char.length - 1)) / 2;
      /*
       *  multiple lines needed
       *  this.ofy = this.heigth / 2 - (char.tall + this.vgap * (char.row-1))/2;
       */
      this.ofy = this.height / 2 - char.tall / 2;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.ctx.fillStyle = 'rgba(0,0,0, .65)';
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.resize();
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      this.drawWallpaper();
      //this.reset();
      this.draw();
      //this.bezier();
      new Circle(this.mouse.x, this.mouse.y, this.radius, new Theme().rgb(5)).draw(this.ctx, 1);
      RAF(function () {
        return _this3.render();
      });
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this4 = this;

      $('#canvas').self.addEventListener('mousemove', function (evt) {
        _this4.mouse.setPos(evt.clientX, evt.clientY);
      }, false);
    }
  }]);

  return Render;
}(Viewport);