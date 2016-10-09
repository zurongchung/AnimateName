'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Viewport = function () {
  function Viewport() {
    _classCallCheck(this, Viewport);

    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
  }

  _createClass(Viewport, [{
    key: 'resize',
    value: function resize() {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
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
    return _this;
  }

  _createClass(Render, [{
    key: 'refresh',
    value: function refresh() {
      this.resize();
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.reset();
      this.init();
      this.draw();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.shapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var o = _step.value;

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
    key: 'init',
    value: function init() {
      var theme = new Theme();
      var chars = new Hex('AD');
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
              var s = _p[2];

              this.livings(x + space + this.ofx, y + this.ofy, theme.rgb(colorIndex), s);
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
    value: function livings(x, y, c, s) {
      /*
       * Save shapes that are appeared on the canvas.
       * An array of shapes that forms our animation.
       */

      if (this.type === 'square') {
        var square = new Square(x, y, c, s);
        //this.square(square);
        this.shapes.push(square);
      } else {
        var circle = new Circle(x, y, c, s);
        //  this.circle(circle);
        this.shapes.push(circle);
      }
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
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }]);

  return Render;
}(Viewport);