function Circle(_x, _y, _r, _clr) {
  this.centerX = _x || 0;
  this.centerY = _y || 0;
  this.radius  = _r || 8;
  this.color   = this.setColor(_clr) || 'rgba(255,0,0)';
  this.startAt = 0;
  this.endAt   = Math.PI * 2;
  this.anticw  = false;
}

Circle.prototype.draw = function() {
  brush.beginPath();
  brush.arc(this.centerX, this.centerY,
             this.radius, this.startAt, this.endAt, this.anticw);
  brush.fillStyle = this.color;
  brush.fill();
}
Circle.prototype.stroke = function() {
  brush.beginPath();
  brush.arc(this.centerX, this.centerY,
             this.radius, this.startAt, this.endAt, this.anticw);
  brush.lineWidth = 2;
  brush.strokeStyle = this.color;
  brush.stroke();
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
