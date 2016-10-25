'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var docElem = document.documentElement;

var DeGuide = function () {
  function DeGuide() {
    var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var hg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var vg = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var ml = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var mr = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var mt = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var mb = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

    _classCallCheck(this, DeGuide);

    /**
     * guide width and height
     */
    var _ref = [row, col];
    this.rows = _ref[0];
    this.columns = _ref[1];

    /**
     * gutters
     */
    var _ref2 = [w, h];
    this.w = _ref2[0];
    this.h = _ref2[1];

    /**
     * Margins
     */
    var _ref3 = [hg.vg];
    this.horizgaps = _ref3[0];
    this.vertgaps = _ref3[1];
    var _ref4 = [ml, mr];
    this.ml = _ref4[0];
    this.mr = _ref4[1];

    /**
     * movement
     */
    var _ref5 = [mt, mb];
    this.mt = _ref5[0];
    this.mb = _ref5[1];
    var _ref6 = [docElem.clientWidth, docElem.clientHeight];
    this.canvasWidth = _ref6[0];
    this.canvasHeight = _ref6[1];
    var _ref7 = [0, 0];
    this.dx = _ref7[0];
    this.dy = _ref7[1];

    /**
     * A collection of guides
     */
    var _ref8 = [this.canvasWidth, this.canvasHeight];
    this.x = _ref8[0];
    this.y = _ref8[1];
    this.guides = [];
    this.xmlns = "http://www.w3.org/2000/svg";
  }

  _createClass(DeGuide, [{
    key: 'runAlgorithm',
    value: function runAlgorithm() {
      //this.w = 60;
      //this.columns = 5
      //this.horizgaps = 10;
      this.rows = 5;
      //this.h = 40;
      this.vertgaps = 10;
      //this.fullScreen();

      !this.columns && !this.w ? console.log('Skip columns') : this.algoColumns();
      !this.rows && !this.h ? console.log('Skip rows') : this.algoRows();
    }
    /**
     * Algorithm to draw columns and rows
     * Require: 
     * => columns or width
     * => rows or height
     */

  }, {
    key: 'algoColumns',
    value: function algoColumns() {
      var canvasWidth = this.canvasWidth - this.ml - this.mr;
      if (!this.columns && this.w) {
        /**
         * calculate columns if only width is known */
        this.columns = canvasWidth / this.w;
      } else if (this.columns && !this.w) {
        /**
         * calculate width if only columns are known */
        this.w = canvasWidth / this.columns;
      }

      var i = 0;
      for (; i <= this.columns; i++) {
        this.dx = i * (this.w + this.horizgaps) + this.ml;
        var prop = [this.dx, 0, 'V', this.y];
        this.createGuides.apply(this, [i].concat(prop));
        if (!!this.horizgaps) {
          prop[0] += this.horizgaps;
          this.createGuides.apply(this, [i + 0.5].concat(prop));
        }
      }
    }
  }, {
    key: 'algoRows',
    value: function algoRows() {
      var canvasHeight = this.canvasHeight - this.mt - this.mb;
      if (!this.rows && this.h) {
        /**
         * calculate rows if only height is known */
        this.rows = canvasHeight / this.h;
      } else if (this.rows && !this.h) {
        /**
         * calculate height if only rows are known */
        this.h = canvasHeight / this.rows;
      }

      var i = 0;
      for (; i <= this.rows; i++) {
        this.dy = i * (this.h + this.vertgaps) + this.mt;
        var prop = [0, this.dy, 'H', this.x];
        this.createGuides.apply(this, [i].concat(prop));
        if (!!this.vertgaps) {
          prop[1] += this.vertgaps;
          this.createGuides.apply(this, [i + 0.5].concat(prop));
        }
      }
    }
  }, {
    key: 'createGuides',
    value: function createGuides(ord, dx, dy, orientation, to) {
      var line = document.createElementNS(this.xmlns, 'path');
      line.classList.add('gline');
      line.setAttribute('d', 'M' + dx + ' ' + dy + ' ' + orientation + ' ' + to);
      line.setAttribute('data-' + orientation + '-order', ord);
      this.guides.push(line);
    }
  }, {
    key: 'getGuides',
    value: function getGuides() {
      this.runAlgorithm();
      return this.guides;
    }
  }, {
    key: 'gen',
    value: function gen() {}
  }, {
    key: 'draw',
    value: function draw() {}
  }]);

  return DeGuide;
}();

var SVG = function () {
  function SVG(nodes) {
    _classCallCheck(this, SVG);

    this.nodes = nodes;
  }

  _createClass(SVG, [{
    key: 'appendSelfTo',
    value: function appendSelfTo() {
      var svg = $('#guidesBox').self;
      svg.append.apply(svg, _toConsumableArray(this.nodes)); // some browser may not support  `append()`    
    }
  }]);

  return SVG;
}();

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded');
  var _ref9 = [docElem.clientWidth, docElem.clientHeight];
  var w = _ref9[0];
  var h = _ref9[1];

  var guides = new DeGuide();
  var svg = new SVG(guides.getGuides());
  svg.appendSelfTo();
});