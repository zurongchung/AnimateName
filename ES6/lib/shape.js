class Shape {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.origx = x;
    this.origy = y;
    this.v = new Vector(0.0, 0.0);
  }
}
class Circle extends Shape {
  constructor(x, y, c, r) {
    super(x, y, c);
    this.r = r;
    this.start = 0;
    this.end = Math.PI * 2;
    this.acw = false;
  }
  draw(ctx,s=0) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.start,
      this.end, this.acw);
    if (s != 0) {
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }else {
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    ctx.closePath();
  }
}
class Square extends Shape {
  constructor(x, y, c, s) {
    super(x, y, c);
    this.w = s;
    this.h = s;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
