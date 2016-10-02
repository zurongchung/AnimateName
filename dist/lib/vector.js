var Vector = function(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.get = function() {
    return {
      x: this.x,
      y: this.y,
    };
  };
};
