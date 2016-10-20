class Shape {
  constructor(x, y, z, c) {
    this.color = c;
    this.mass  = z;
    this.curPos       = new Vector(x,y,z);
    this.originalPos  = new Vector(x,y,z);
    this.targetPos    = new Vector(x,y);
    this.velocity    = new Vector(0.0, 0.0);
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
  update() {
    const strength = document.springStrength;
    const [friction, rotationFroce] = [document.friction, document.rotationForce];
    
    const [dx, dy] = [this.targetPos.x - this.curPos.x, this.targetPos.y - this.curPos.y];
    const ax = (dx / this.mass) - (rotationFroce * dy);
    const ay = (dy / this.mass) + (rotationFroce * dx);
    //console.log(rotationFroce)
    this.velocity.x += ax;
    this.velocity.x -= this.velocity.x * friction;
    this.curPos.x += this.velocity.x;

    this.velocity.y += ay;
    this.velocity.y -= this.velocity.y * friction;
    this.curPos.y += this.velocity.y;


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
    this.t = 0.2;
    this.speed = 0.1;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.cpx,this.cpy,this.cp1x,this.cp1y,this.ex,this.ey);
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
  update(ctx) {
    if (this.t >= 1 || this.t < 0) this.speed *= -1;
    this.speed -= this.speed * 0.01;
    this.t += this.speed;
    // point on the line same as starting point
    let qx = (1-this.t) * this.x + this.t* this.cpx;
    let qy = (1-this.t) * this.y + this.t* this.cpy;
    // point on curve tangent line
    let rx = (1-this.t) * this.cpx + this.t* this.cp1x;
    let ry = (1-this.t) * this.cpy + this.t* this.cp1y;
    // point on the line same as ending point
    let sx = (1-this.t) * this.cp1x + this.t* this.ex;
    let sy = (1-this.t) * this.cp1y + this.t* this.ey;

    // line connect three points above
    new Line(qx,qy,rx,ry, 'rgb(44, 122, 185)').draw(ctx);
    new Line(rx,ry,sx,sy, 'rgb(44, 122, 185)').draw(ctx);


    // point on the first moving line
    let ax = (1-this.t) * qx + this.t* rx;
    let ay = (1-this.t) * qy + this.t* ry;
    // point on the second moving line
    let fx = (1-this.t) * rx + this.t* sx;
    let fy = (1-this.t) * ry + this.t* sy;

    // line for the tip lies on
    new Line(ax,ay,fx,fy, 'rgb(186, 57, 68)').draw(ctx);
    // point of the tip
    let Gx = (1-this.t) * ax + this.t* fx;
    let Gy = (1-this.t) * ay + this.t* fy;


    // tip of the pen
    new Circle(Gx, Gy, 7, 'rgb(183, 228, 33)').draw(ctx);
  }
}
