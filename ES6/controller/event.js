class Movement {
  constructor(x,y) {
    this.mx = x;
    this.my = y;
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
}
