const docElem = document.documentElement;
const RAF   = window.requestAnimationFrame;
document.force = 15;
//document.springStrength = 0.1;
document.friction = 0.05;
document.rotationForce = 0.0;
// dots
let t = 0;
let speed = 0.1;
const z = 10;
const [p0, cp1, cp2, p1] = [{x: 500, y: 120}, {x: 680, y: 280},
  {x: 650, y: 550}, {x: 720, y: 420}];
class Viewport {
  constructor() {
    this.canvas.width = docElem.clientWidth;
    this.canvas.height = docElem.clientHeight;
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
    this.width = docElem.clientWidth;
    this.height = docElem.clientHeight;
  }

}
class Render extends Viewport {
  constructor(type= 'circle') {
    super();
    this.type = type.toLowerCase();
    this.hgap  = 10;
    this.vgap  = 0;
    this.shapes = [];
    this.ball = [];  // exp bezier

    // Initialize mouse
    this.mouse = new Vector(9999, 9999);
    this.radius = 120;
  }

  draw() {
    for (const o of this.shapes) {
      this.update(o);
      o.draw(this.ctx);
    }

  }
  update(curObj) {
    /**
     * to -> s The distance in a straight line between center of the mouse 
     * and center of the shape
     */
    const [dx, dy] = [this.mouse.x - curObj.curPos.x, this.mouse.y - curObj.curPos.y];
    const s = Math.sqrt(dx*dx + dy*dy);

    let ss = Math.round( Math.sqrt( Math.pow(curObj.curPos.x - curObj.originalPos.x, 2) + 
    Math.pow(curObj.curPos.y - curObj.originalPos.y, 2)));
    let distance = document.force;

    if (s < (this.radius + curObj.radius)) {
      const angle = this.mouse.x < curObj.curPos.x ? Math.atan(dy/dx) :
      Math.PI - Math.atan(dy/dx) * -1;
      const shiftx = Math.cos(angle) * document.force;
      const shifty = Math.sin(angle) * document.force;
      /**
       * setting target position*/
      curObj.targetPos.setPos(curObj.curPos.x + shiftx, curObj.curPos.y + shifty);
      /**
       * to --> distance Is when the shape will going  back to original position
       * if it has been intercept while going towards original position
       * then this distance has to be increase by the remaining distance
       */
      distance += ss;
    }
    if(!s < (this.radius + curObj.radius) && ss >= distance) {
      curObj.targetPos.setPos(curObj.originalPos.x, curObj.originalPos.y);
    }
    curObj.update();
  }

  init() {
    // exp bezier
    this.ball.push( new Cubic(p0.x, p0.y, cp1.x, cp1.y,cp2.x,cp2.y,p1.x, p1.y));
        
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
   bezier() {
    // visual lines
    new Circle(p0.x, p0.y, z-4, '#FFF').draw(this.ctx, 1);
    new Circle(p1.x, p1.y, z-4, '#FFF').draw(this.ctx, 1);
    new Circle(cp1.x, cp1.y, z, '#FFF').draw(this.ctx, 1);
    new Circle(cp2.x, cp2.y, z, '#FFF').draw(this.ctx, 1);

    // line connect control points
    new Line(p0.x, p0.y, cp1.x, cp1.y).draw(this.ctx);
    new Line(cp1.x, cp1.y, cp2.x, cp2.y).draw(this.ctx);
    new Line(cp2.x, cp2.y, p1.x, p1.y).draw(this.ctx);

    // moving ball
    const ball = this.ball[0];
    ball.update(this.ctx);
    ball.draw(this.ctx);

  }
  drawWallpaper() {
    const [w, h] = [69, 100];
    const [row, col] = [Math.round(this.height/h), Math.round(this.width/w)];
    const img = new Image();
    img.addEventListener('load', ()=> {
      for(let i=0; i<col; i++) {
        for(let r=0; r<row; r++) {
          this.ctx.save();
          this.ctx.translate(i*w, r*h);
          this.ctx.drawImage(img,0,0);
          this.ctx.restore();
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
    refresh() {
    this.resize();
    this.render();
  }
  render() {
    this.drawWallpaper();
    //this.reset();
    this.draw()
    //this.bezier();
    new Circle(this.mouse.x, this.mouse.y, this.radius, new Theme().rgb(5)).draw(this.ctx, 1);
    RAF(()=>this.render());
  }
  listen() {
    $('#canvas').self.addEventListener('mousemove', evt => {
      this.mouse.setPos(evt.clientX, evt.clientY);
    }, false);
  }
 
}
