'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var docEt = document.documentElement;
var RAF = window.requestAnimationFrame;

var Viewport = function () {
  function Viewport() {
    _classCallCheck(this, Viewport);

    this.canvas.width = docEt.clientWidth;
    this.canvas.height = docEt.clientHeight;
  }

  _createClass(Viewport, [{
    key: 'resize',
    value: function resize() {
      this.width = docEt.clientWidth;
      this.height = docEt.clientHeight;
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
    _this.dx = 0;
    _this.dy = 0;
    _this.s = 0;
    _this.spiralForce = 60;
    _this.max = 90;
    _this.friction = 0.5;

    // Initialize mouse
    _this.mouse = new Vector(9999, 9999);
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
      var _this2 = this;

      this.reset();
      this.draw();
      new Circle(this.mouse.x, this.mouse.y, new Theme().rgb(5), 120).draw(this.ctx, 1);
      RAF(function () {
        return _this2.render();
      });
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
      /*
       * I have reached baby bird
       * and deciding move it to somewhere */
      this._activate(curObj);
      /*
       * The birdie still sleeping on its nest, dosen't know
       * the danger is closing
       * Then i take it to a place far from its nest
       * Or it wake up and found itself at nowhere
       * Terrified at first but stronger birdie calmed down
       * and smart birdie start thinking how to get back home
       * And it starting do the math. find its way home.
       */
      if (curObj.active) {
        this.ctx.beginPath();
        this.ctx.moveTo(curObj.x, curObj.y);
        this.ctx.lineTo(curObj.origx, curObj.origy);
        this.ctx.strokeStyle = "#FFF";
        this.ctx.stroke();

        /*
         * Given shape (a push) an unbalanced force that will change the
         * stete of that shape.
         * The direction of this force usually diagonal.
         * And Break it down into horizontal force and verticle force.
         * while mouse touched shape */

        if (curObj.farFromHome && !curObj.trigTrap) {
          /*
           * I moved the baby bird to somewhere far from its nest
           * And baby bird realized it has been moved during sleep
           * Now it wants to get back to its nest
           * So it do the math
           * @speed with a normal speed
           * @distance  How long the distance between it and its nest
           * @step How many step or time it gonna take to get there
           * @easeout It decide when it almost get there it will fly
           * towards the nest
           */
          curObj.direction = this.getback(curObj, curObj.dy / curObj.dx);
          //curObj.force = curObj.defForce;
          /*
           * Its going home, so its not far From Home anymore */
          curObj.farFromHome = false;
        }
        curObj.v.x = Math.cos(curObj.direction) * curObj.force;
        curObj.v.y = Math.sin(curObj.direction) * curObj.force;
        /*
         * Acceleration of the my speed */
        curObj.a.x = curObj.v.x / curObj.mass;
        curObj.a.y = curObj.v.y / curObj.mass;

        // moving the birdie
        curObj.x += curObj.v.x + curObj.a.x;
        curObj.y += curObj.v.y + curObj.a.y;
        /*
        * Air and/or ground friction slows me down */
        curObj.force -= this.friction;

        if (Math.round(curObj.force) == 0) {
          curObj.trigTrap = false;
          /*
           * @displacement => mathematical symbol is  `s`
           * Baby bird has calculated the distance between it and its nest */
          var _ref = [curObj.x - curObj.origx, curObj.y - curObj.origy];
          curObj.dx = _ref[0];
          curObj.dy = _ref[1];

          curObj.distance = Math.floor(Math.sqrt(curObj.dx * curObj.dx + curObj.dy * curObj.dy));
          curObj.force = curObj.defForce;
          if (curObj.distance > 0) {
            curObj.farFromHome = true;
          }
          if (curObj.distance == 0) {
            /*
             * Home sweet home. The birdie made it.*/
            curObj.farFromHome = false;
            curObj.active = false;
          }
        }
      }
    }
  }, {
    key: 'goto',
    value: function goto(curObj, tangent) {
      /*
       * Calulate the angle of the moving path of that shape */
      return this.mouse.x < curObj.x ? Math.atan(tangent) : Math.PI - Math.atan(tangent) * -1;
    }
  }, {
    key: 'getback',
    value: function getback(curObj, tangent) {
      return curObj.x < curObj.origx ? Math.atan(tangent) : Math.PI - Math.atan(tangent) * -1;
    }
  }, {
    key: '_activate',
    value: function _activate(curObj) {
      /*
       * This is the distance between me and the sleeping baby bird */
      var dx = this.mouse.x - curObj.x;
      var dy = this.mouse.y - curObj.y;

      var s = Math.floor(Math.sqrt(dx * dx + dy * dy));
      if (s < 120) {
        /*
         * Only
         * change the angle of the path that shape moves
         * when mouse and shape has been touched */
        curObj.direction = this.goto(curObj, dy / dx);
        if (curObj.active) {
          /*
           * while birdie going home,
           * I have already set a trap on its way home
           * if it triggered that trap, then it will
           * have to run back for its life.
           *  */
          curObj.trigTrap = true;
          //  curObj.force = curObj.defForce;
        } else {
          curObj.active = true;
        }
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this.listen();
      var theme = new Theme();
      var chars = new Hex('FACE');
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
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      $('#canvas').addEventListener('mousemove', function (evt) {
        _this3.mouse.setPos(evt.clientX, evt.clientY);
      }, false);
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