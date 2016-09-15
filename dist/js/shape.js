function Circle() {
  this.centerX = 0;
  this.centerY = 0;
  this.radius  = 0;
  this.startAt = 0;
  this.endAt   = Math.PI * 2;
  this.anticw  = false;
}

Circle.prototype.draw = function(_brush,_clr) {
  _brush.beginPath();
  _brush.arc();
  _brush.fillStyle = _clr;
  _brush.fill();
}
