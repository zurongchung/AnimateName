class Viewport {
  constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

}
class Render extends Viewport {
  constructor(type= 'circle') {
    super();
    this.type = type.toLowerCase();
    this.hgap  = 10;
    this.vgap  = 0;
    this.shapes = [];
  }
  refresh() {
    this.resize();
    this.render();
  }
  render() {
    this.reset();
    this.init();
    this.draw();
  }
  init() {
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
  draw() {
    for (const o of this.shapes) {
      o.draw(this.ctx);
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
