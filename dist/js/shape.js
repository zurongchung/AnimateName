function Shape(_x, _y, _r, _clr) {
  this.centerX = _x || 0;
  this.centerY = _y || 0;
  this.radius  = _r || 8;
  this.color   = this.setColor(_clr);
  this.startAt = 0;
  this.endAt   = Math.PI * 2;
  this.anticw  = false;
}

Shape.prototype.draw = function() {
  brush.beginPath();
  brush.arc(this.centerX, this.centerY,
             this.radius, this.startAt, this.endAt, this.anticw);
  brush.fillStyle = this.color;
  brush.fill();
};

Shape.prototype.stroke = function() {
  brush.beginPath();
  brush.arc(this.centerX, this.centerY,
             this.radius, this.startAt, this.endAt, this.anticw);
  brush.lineWidth = 2;
  brush.strokeStyle = this.color;
  brush.stroke();
};

Shape.prototype.lines = function(_mx, _my, _cx, _cy, _clr = this.color) {
  brush.beginPath();
  brush.moveTo(_mx, _my);
  brush.lineTo(_cx, _cy);
  brush.lineWidth = 0.5;
  brush.strokeStyle = _clr;
  brush.stroke();
};

// Define color for the geometric shape
// if we ever want to Change color dynamically
// we can do it in this function
Shape.prototype.setColor = function(_clr) {
  if (_clr === undefined) {
    return 'cyan';
  }else {
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
};




// Calculate points on the circle
// this will be the touch point between those two circles
function touchPoint(_theta, _radius, _cx, _cy) {
  return {
    x: Math.cos(_theta) * _radius + _cx,
    y: Math.sin(_theta) * _radius + _cy,
  };
}
