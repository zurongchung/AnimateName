const docEt = document.documentElement;
const RAF   = window.requestAnimationFrame;
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
    this.dx = 0;
    this.dy = 0;

    // Initialize mouse
    this.mouse = new Vector(9999, 9999);
  }
  refresh() {
    this.resize();
    this.render();
  }
  render() {
    this.reset();
    this.draw();
  new Circle(this.mouse.x, this.mouse.y, new Theme().rgb(5), 200).draw(this.ctx, 1);
    RAF(()=>this.render());
  }
  listen() {
    $('#canvas').addEventListener('mousemove', evt => {
      this.mouse.setPos(evt.clientX, evt.clientY);
    }, false);
  }
  draw() {
    for (const o of this.shapes) {
      this.update(o);
      o.draw(this.ctx);
    }

  }
  update(curObj) {
    if (this._activate(curObj)) curObj.v.x = 0.5;
    curObj.x += curObj.v.x;
  }

  _activate(obj) {
    [this.dx, this.dy] = [this.mouse.x - obj.x, this.mouse.y - obj.y];
    let s = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy));

    this.ctx.beginPath();
    this.ctx.moveTo(this.mouse.x, this.mouse.y);
    this.ctx.lineTo(obj.x, obj.y);
    this.ctx.strokeStyle = '#FFF';
    this.ctx.stroke();
    if(s < 200) {
      return true;
    }
  }

  init() {
    this.listen();
    const theme = new Theme();
    const chars = new Hex('AD');
    const arrayOfCodes = chars.codes;
    this.alignCenter(chars);

    var [colorIndex, space] = [0,0];
    for (const pos of arrayOfCodes) {
      const pointGetter  = new Point(pos);
      const points       = pointGetter.points;
      for (const p of points) {
        const [x, y, s] = p;
        this.livings(x + space + this.ofx, y + this.ofy, theme.rgb(colorIndex), s);
      }
      space += (pointGetter.width + this.hgap);
      colorIndex >= theme.length ? colorIndex = 0 : colorIndex++;
    }
  }

  livings(x, y, c, s) {
    /*
     * Save shapes that are appeared on the canvas.
     * An array of shapes that forms our animation.
     */

    if (this.type === 'square') {
      let square = new Square(x, y, c, s);
      //this.square(square);
      this.shapes.push(square);
    }else {
      let circle = new Circle(x, y, c, s);
    //  this.circle(circle);
      this.shapes.push(circle);
    }

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
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
