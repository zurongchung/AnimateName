class Shape {
  constructor(x, y, z, c) {
    this.color = c;
    this.curPos = new Vector(x,y,z);
    this.originalPos = new Vector(x,y,z);
    this.v = new Vector(0.0, 0.0);
  }
}
class Circle extends Shape {
  constructor(x, y, z, c) {
    super(x, y, z, c);
    this.radius = z;
    this.start = 0;
    this.end = Math.PI * 2;
    this.acw = false;
  }
  draw(ctx,s=0) {
    ctx.beginPath();
    ctx.arc(this.curPos.x, this.curPos.y, this.radius,
      this.start, this.end, this.acw);
    if (s != 0) {
      ctx.lineWidth = 1;
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
  constructor(x, y, z, c) {
    super(x, y, z, c);
    this.w = z;
    this.h = z;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.curPos.x, this.curPos.y, this.w, this.h);
  }
}
class Line {
  constructor(x,y,ex,ey,c='cyan') {
    this.x = x;
    this.y = y;
    this.ex = ex;
    this.ey = ey;
    this.color = c;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.ex, this.ey);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
class Curve {
  constructor(x,y,cpx,cpy,ex,ey,c='orange') {
    this.x = x;
    this.y = y;
    this.ex = ex;
    this.ey = ey;
    this.cpx = cpx;
    this.cpy = cpy;
    this.color = c;
  }
}
class Cubic extends Curve {
  constructor(x,y,cpx,cpy,cp1x,cp1y,ex,ey,c) {
    super(x,y,cpx,cpy,ex,ey,c);
    this.cp1x = cp1x;
    this.cp1y = cp1y;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.cpx,this.cpy,this.cp1x,this.cp1y,this.ex,this.ey);
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
