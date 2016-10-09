/*
 * Gather Points that forms our words
 */
class Point {
  constructor(pos) {
    this.pos = `A${pos}`;
    const {[this.pos]: {w, p}} = Alphabet;
    this.w = w;
    this.setOfPoint = p;
  }
  get manyPoints() {
    return this.points.length;
  }
  get width() {
    return this.w;
  }
  get height() {
    return Math.floor(this.w / 1.618);
  }
  get points() {
    return this.setOfPoint;
  }
  x(index) {
    return this.point[index][0];
  }
  y(index) {
    return this.point[index][1];
  }
  radius(index) {
    return this.point[index][2];
  }
  tone(index) {
    return this.point[index][3];
  }
}
