/*
 * Gather Points that forms our words
 */
class Point {
  constructor(pos) {
    this.pos = pos;
    this.letter = Alphabet[`A${this.pos}`];
  }
  get manyPoints() {
    return this.letter.p.length;
  }
  get width() {
    return this.letter.w;
  }
  point(index) {
    return this.letter.p[index];
  }
  x(index) {
    return this.letter.p[index][0];
  }
  y(index) {
    return this.letter.p[index][1];
  }
  radius(index) {
    return this.letter.p[index][2];
  }
  tone(index) {
    return this.letter.p[index][3];
  }
}
