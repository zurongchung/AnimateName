function Circle(_x, _y, _r, _clr) {
  this.centerX = _x || 0;
  this.centerY = _y || 0;
  this.radius  = _r || 8;
  this.color   = this.setColor(_clr) || 'red';
  this.startAt = 0;
  this.endAt   = Math.PI * 2;
  this.anticw  = false;
}

Circle.prototype.draw = function(_brush) {
  _brush.beginPath();
  _brush.arc(this.centerX, this.centerY,
             this.radius, this.startAt, this.endAt, this.anticw);
  _brush.fillStyle = this.color;
  _brush.fill();
}

// Define color for the geometric shape
// if we ever want to Change color dynamically
// we can do it in this function
Circle.prototype.setColor = function(_clr) {
  var color = 'rgb('
  var i = 0;
  for (; i < _clr.length; i++) {
    if (i == 0 || i == 1) {
      color += (_clr[i] + ', ');
    }else {
      color += (_clr[i] + ')');
    }
  }
  return color;
}
