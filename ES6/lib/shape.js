class Shape {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.origx = x;
    this.origy = y;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.defForce = 10;
    this.force = this.defForce;
    this.direction = 0;
    this.active = false;
    this.farFromHome = false;
    this.trigTrap = false;
    this.v = new Vector(0.0, 0.0);
    this.a = new Vector(0.0, 0.0);
  }
}
class Circle extends Shape {
  constructor(x, y, c, r) {
    super(x, y, c);
    this.r = r;
    this.mass = r;
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
