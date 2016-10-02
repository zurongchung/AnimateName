function Shape(_x, _y, _r, _vx, _vy, _clr) {
  this.x = _x;
  this.y = _y;
  this.radius  = _r;
  this.vx = _vx;
  this.vy = _vy;
  this.origX = _x;
  this.origY = _y;
  this.color   = this.setColor(_clr);
  this.startAt = 0;
  this.endAt   = Math.PI * 2;
  this.anticw  = false;
}

Shape.prototype.draw = function(_type) {
  brush.beginPath();
  if (_type === 'stroke'){
    this.circleStroke();
  }else{
    this.circle();
  }
};

Shape.prototype.circle = function() {
    brush.arc(this.x, this.y, this.radius, this.startAt, this.endAt, this.anticw);
    brush.fillStyle = this.color;
    brush.fill();
};

Shape.prototype.circleStroke = function() {
  brush.arc(this.x, this.y, this.radius, this.startAt, this.endAt, this.anticw);
  brush.lineWidth = 2;
  brush.strokeStyle = this.color;
  brush.stroke();
};

Shape.prototype.lines = function(_mx, _my, _cx, _cy, _clr = this.color) {
  brush.beginPath();
  brush.moveTo(_mx, _my);
  brush.lineTo(_cx, _cy);
  brush.lineWidth = 1;
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
