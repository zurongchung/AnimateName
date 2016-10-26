'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var docElem = document.documentElement;

var DeGuide = function () {
  function DeGuide() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var mr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var hgutter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var height = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var row = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var mt = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var ml = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var vgutter = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

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
    var _ref2 = [width, height];
    this.w = _ref2[0];
    this.h = _ref2[1];

    /**
     * Margins
     */
    var _ref3 = [hgutter, vgutter];
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
    key: 'algoQuickGuides',
    value: function algoQuickGuides(target) {
      var properties = [];
      switch (target) {
        case 'left':
          properties = [0, 0, 0, 'V', this.canvasHeight];
          break;
        case 'right':
          properties = [-1, this.canvasWidth, 0, 'V', this.canvasHeight];
          break;
        case 'top':
          properties = [0, 0, 0, 'H', this.canvasWidth];
          break;
        case 'bottom':
          properties = [-1, 0, this.canvasHeight, 'H', this.canvasWidth];
          break;
        case 'row-mid':
          properties = [0.5, 0, this.canvasHeight / 2, 'H', this.canvasWidth];
          break;
        case 'col-mid':
          properties = [0.5, this.canvasWidth / 2, 0, 'V', this.canvasHeight];
          break;
      }
      this.createGuides.apply(this, _toConsumableArray(properties));
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
    value: function getGuides(target) {
      if (target == 'gen-btn') {
        this.runAlgorithm();
      } else {
        this.algoQuickGuides(target);
      }
      return this.guides;
    }
  }]);

  return DeGuide;
}();

var UI = function () {
  function UI() {
    _classCallCheck(this, UI);

    this.values = [];
    this.quickGuideIDs = ['left', 'row-mid', 'top', 'bottom', 'col-mid', 'right'];
    this.IDs = ['width', 'columns', 'margin_bottom', 'margin_right', 'horiz_gutters', 'height', 'rows', 'margin_top', 'margin_left', 'vert_gutters'];
    this.elements = this.getValueFieldElements();
    this.pathParent = $('#groupGuides').self;
    this.againstNonNumbers = /[^\d]/;
    this.numbers = /\d/;
  }

  _createClass(UI, [{
    key: 'getValueFieldElements',
    value: function getValueFieldElements() {
      var _this = this;

      var node = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var target = _step.value;

          var input_tag = $('#' + target).self;
          node.push(input_tag);
          $('#' + target).listenTo('blur', function (e) {
            if (!_this.againstNonNumbers.test(input_tag.value) && input_tag.value != '') {
              input_tag.value += 'px';
            }
          });
        };

        for (var _iterator = this.IDs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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

      return node;
    }
    /**
     * Have values from UI panel
     */

  }, {
    key: 'getValues',
    value: function getValues() {
      this.values = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;

          var value = 0;
          if (this.numbers.test(node.value)) {
            value = parseInt(node.value);
          }
          this.values.push(value);
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

      return this.values;
    }
  }, {
    key: 'gen',
    value: function gen() {
      var _this2 = this;

      $('#gen-btn').listenTo('click', function (e) {
        var guideProp = _this2.getValues();
        var guide = new (Function.prototype.bind.apply(DeGuide, [null].concat(_toConsumableArray(guideProp))))();
        _this2.appendSelfTo(guide.getGuides(e.currentTarget.id));
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this3 = this;

      $('#clear-btn').listenTo('click', function (e) {
        while (_this3.pathParent.firstChild) {
          _this3.pathParent.removeChild(_this3.pathParent.firstChild);
        }
      });
    }
  }, {
    key: 'quickGuide',
    value: function quickGuide() {
      var _this4 = this;

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.quickGuideIDs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var id = _step3.value;

          $('#' + id).listenTo('click', function (e) {
            _this4.appendSelfTo(new DeGuide().getGuides(e.currentTarget.id));
          });
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
    }
  }, {
    key: 'attachListener',
    value: function attachListener() {
      this.gen();
      this.clear();
      this.quickGuide();
    }
  }, {
    key: 'appendSelfTo',
    value: function appendSelfTo(nodes) {
      var _pathParent;

      (_pathParent = this.pathParent).append.apply(_pathParent, _toConsumableArray(nodes)); // some browser may not support  `append()`    
    }
  }]);

  return UI;
}();

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded');
  var ui = new UI();
  ui.attachListener();
});