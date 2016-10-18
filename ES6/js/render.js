const docEt = document.documentElement;
const RAF   = window.requestAnimationFrame;
// dots
let t = 0;
let speed = 0.1;
const z = 10;
const [p0, cp1, cp2, p1] = [{x: 500, y: 120}, {x: 680, y: 280},
  {x: 650, y: 550}, {x: 720, y: 420}];
class Viewport {
  constructor() {
    this.canvas.width = docEt.clientWidth;
    this.canvas.height = docEt.clientHeight;
  }
  get canvas() {
    return document.getElementById('canvas');
  }
  get ctx() {
    return this.canvas.getContext('2d');
  }
  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  set width(val) {
    this.canvas.width = val;
  }
  set height(val) {
    this.canvas.height = val;
  }
  resize() {
    this.width = docEt.clientWidth;
    this.height = docEt.clientHeight;
  }

}
class Render extends Viewport {
  constructor(type= 'circle') {
    super();
    this.type = type.toLowerCase();
    this.hgap  = 10;
    this.vgap  = 0;
    this.shapes = [];

    // Initialize mouse
    this.mouse = new Vector(9999, 9999);
    this.radius = 120;
  }
  refresh() {
    this.resize();
    this.render();
  }
  render() {
    this.drawWallpaper();
    //this.reset();
    //this.draw()
    this.bezier();
    this.curvy();
    //new Circle(this.mouse.x, this.mouse.y, this.radius, new Theme().rgb(5)).draw(this.ctx, 1);
    RAF(()=>this.render());
  }
  listen() {
    $('#canvas').self.addEventListener('mousemove', evt => {
      this.mouse.setPos(evt.clientX, evt.clientY);
    }, false);
  }
  bezier() {
    new Circle(p0.x, p0.y, z-4, '#FFF').draw(this.ctx, 1);
    new Circle(p1.x, p1.y, z-4, '#FFF').draw(this.ctx, 1);
    new Circle(cp1.x, cp1.y, z, '#FFF').draw(this.ctx, 1);
    new Circle(cp2.x, cp2.y, z, '#FFF').draw(this.ctx, 1);

    // control line
    new Line(p0.x, p0.y, cp1.x, cp1.y).draw(this.ctx);
    new Line(cp1.x, cp1.y, cp2.x, cp2.y).draw(this.ctx);
    new Line(cp2.x, cp2.y, p1.x, p1.y).draw(this.ctx);

    new Cubic(p0.x, p0.y, cp1.x, cp1.y,cp2.x,cp2.y,p1.x, p1.y).draw(this.ctx);
  }
  curvy() {
    if (t >= 1 || t < 0) speed *= -1;
    speed -= speed * 0.01;
    t += speed;
    // point on the line same as starting point
    let qx = (1-t) * p0.x + t* cp1.x;
    let qy = (1-t) * p0.y + t* cp1.y;
    // point on curve tangent line
    let rx = (1-t) * cp1.x + t* cp2.x;
    let ry = (1-t) * cp1.y + t* cp2.y;
    // point on the line same as ending point
    let sx = (1-t) * cp2.x + t* p1.x;
    let sy = (1-t) * cp2.y + t* p1.y;

    // line connect three points above
    new Line(qx,qy,rx,ry, 'rgb(44, 122, 185)').draw(this.ctx);
    new Line(rx,ry,sx,sy, 'rgb(44, 122, 185)').draw(this.ctx);


    // point on the first moving line
    let ax = (1-t) * qx + t* rx;
    let ay = (1-t) * qy + t* ry;
    // point on the second moving line
    let fx = (1-t) * rx + t* sx;
    let fy = (1-t) * ry + t* sy;

    // line for the tip lies on
    new Line(ax,ay,fx,fy, 'rgb(186, 57, 68)').draw(this.ctx);
    // point of the tip
    let Gx = (1-t) * ax + t* fx;
    let Gy = (1-t) * ay + t* fy;


    // tip of the pen
    new Circle(Gx, Gy, z-2, 'rgb(183, 228, 33)').draw(this.ctx);

  }
  draw() {
    for (const o of this.shapes) {
      this.update(o);
      o.draw(this.ctx);
    }

  }
  update(curObj) {

  }

  init() {
    this.listen();
    const theme = new Theme();
    const chars = new Hex('RACG');
    const arrayOfCodes = chars.codes;
    this.alignCenter(chars);

    var [colorIndex, space] = [0,0];
    for (const pos of arrayOfCodes) {
      const pointGetter  = new Point(pos);
      const points       = pointGetter.points;
      for (const p of points) {
        const [x, y, z] = p;
        this.livings(x + space + this.ofx, y + this.ofy, z, theme.rgb(colorIndex));
      }
      space += (pointGetter.width + this.hgap);
      colorIndex >= theme.length ? colorIndex = 0 : colorIndex++;
    }
  }

  livings(x, y, z, c) {
    /*
     * Save shapes that are appeared on the canvas.
     * An array of shapes that forms our animation.
     */

    if (this.type === 'square') {
      let square = new Square(x, y, z, c);
      //this.square(square);
      this.shapes.push(square);
    }else {
      let circle = new Circle(x, y, z, c);
    //  this.circle(circle);
      this.shapes.push(circle);
    }

  }
  drawWallpaper() {
    const [w, h] = [69, 100];
    const [row, col] = [Math.round(this.height/h), Math.round(this.width/w)];
    const img = new Image();
    img.addEventListener('load', ()=> {
      for(let i=0; i<col; i++) {
        for(let r=0; r<row; r++) {
          this.ctx.drawImage(img, i*w,r*h);
        }
      }
    },false);
    img.src = './assets/img/backdrop.png';
  }
  alignCenter(char) {
    /*
     *  Centering sentence */
    this.ofx = this.width/2 - (char.wide + this.hgap * (char.length-1))/2;
    /*
     *  multiple lines needed
     *  this.ofy = this.heigth / 2 - (char.tall + this.vgap * (char.row-1))/2;
     */
    this.ofy = this.height/2 - char.tall/2;
  }
  reset() {
    this.ctx.fillStyle = 'rgba(0,0,0, .65)';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
