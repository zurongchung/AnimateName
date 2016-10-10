class Movement {
  constructor() {
    this.mx = 9999;
    this.my = 9999;
  }
  get x() {
    return this.mx;
  }
  get y() {
    return this.my;
  }
  set x(value) {
    this.mx = value;
  }
  set y(value) {
    this.my = value;
  }
  setMousePos(evt) {
    this.x = evt.clientX;
    this.y = evt.clientY;
  }
  listen() {
    $('#canvas').addEventListener('mousemove', this.setMousePos, false);
  }
}
