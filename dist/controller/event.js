'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Movement = function () {
  function Movement() {
    _classCallCheck(this, Movement);

    this.mx = 9999;
    this.my = 9999;
  }

  _createClass(Movement, [{
    key: 'setMousePos',
    value: function setMousePos(evt) {
      this.x = evt.clientX;
      this.y = evt.clientY;
    }
  }, {
    key: 'listen',
    value: function listen() {
      $('#canvas').addEventListener('mousemove', this.setMousePos, false);
    }
  }, {
    key: 'x',
    get: function get() {
      return this.mx;
    },
    set: function set(value) {
      this.mx = value;
    }
  }, {
    key: 'y',
    get: function get() {
      return this.my;
    },
    set: function set(value) {
      this.my = value;
    }
  }]);

  return Movement;
}();