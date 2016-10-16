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
    this.s = 0;
    this.spiralForce = 60;
    this.max = 90;
    this.friction = 0.5;

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
    new Circle(this.mouse.x, this.mouse.y, new Theme().rgb(5), 120).draw(this.ctx, 1);
    RAF(()=>this.render());
  }
  draw() {
    for (const o of this.shapes) {
      this.update(o);
      o.draw(this.ctx);
    }

  }
  update(curObj) {
    /*
     * I have reached baby bird
     * and deciding move it to somewhere */
    this._activate(curObj);
    /*
     * The birdie still sleeping on its nest, dosen't know
     * the danger is closing
     * Then i take it to a place far from its nest
     * Or it wake up and found itself at nowhere
     * Terrified at first but stronger birdie calmed down
     * and smart birdie start thinking how to get back home
     * And it starting do the math. find its way home.
     */
    if(curObj.active) {
      this.ctx.beginPath();
      this.ctx.moveTo(curObj.x, curObj.y);
      this.ctx.lineTo(curObj.origx, curObj.origy);
      this.ctx.strokeStyle = "#FFF";
      this.ctx.stroke();

      /*
       * Given shape (a push) an unbalanced force that will change the
       * stete of that shape.
       * The direction of this force usually diagonal.
       * And Break it down into horizontal force and verticle force.
       * while mouse touched shape */

       if(curObj.farFromHome && !curObj.trigTrap) {
         /*
          * I moved the baby bird to somewhere far from its nest
          * And baby bird realized it has been moved during sleep
          * Now it wants to get back to its nest
          * So it do the math
          * @speed with a normal speed
          * @distance  How long the distance between it and its nest
          * @step How many step or time it gonna take to get there
          * @easeout It decide when it almost get there it will fly
          * towards the nest
          */
         curObj.direction = this.getback(curObj, curObj.dy/curObj.dx);
         //curObj.force = curObj.defForce;
         /*
          * Its going home, so its not far From Home anymore */
         curObj.farFromHome = false;

       }
       curObj.v.x = Math.cos(curObj.direction) * curObj.force;
       curObj.v.y = Math.sin(curObj.direction) * curObj.force;
       /*
        * Acceleration of the my speed */
       curObj.a.x = curObj.v.x / curObj.mass;
       curObj.a.y = curObj.v.y / curObj.mass;

       // moving the birdie
       curObj.x += curObj.v.x + curObj.a.x;
       curObj.y += curObj.v.y + curObj.a.y;
       /*
       * Air and/or ground friction slows me down */
       curObj.force -= this.friction;

       if (Math.round(curObj.force) == 0) {
         curObj.trigTrap = false;
         /*
          * @displacement => mathematical symbol is  `s`
          * Baby bird has calculated the distance between it and its nest */
         [curObj.dx, curObj.dy] = [curObj.x - curObj.origx, curObj.y - curObj.origy];
         curObj.distance = Math.floor(Math.sqrt(curObj.dx*curObj.dx + curObj.dy*curObj.dy));
         curObj.force = curObj.defForce;
         if (curObj.distance > 0) {
           curObj.farFromHome = true;
         }
         if (curObj.distance == 0) {
           /*
            * Home sweet home. The birdie made it.*/
            curObj.farFromHome = false;
            curObj.active = false;
         }

       }

    }
  }
  goto(curObj, tangent) {
    /*
     * Calulate the angle of the moving path of that shape */
    return this.mouse.x < curObj.x ? Math.atan(tangent) :
      Math.PI - Math.atan(tangent) * -1;
  }
  getback(curObj, tangent) {
    return curObj.x < curObj.origx ? Math.atan(tangent) :
     Math.PI - Math.atan(tangent) * -1;
  }
  _activate(curObj) {
    /*
     * This is the distance between me and the sleeping baby bird */
    let [dx, dy] = [this.mouse.x - curObj.x, this.mouse.y - curObj.y];
    let s = Math.floor(Math.sqrt(dx * dx + dy * dy));
    if(s < 120)  {
      /*
       * Only
       * change the angle of the path that shape moves
       * when mouse and shape has been touched */
      curObj.direction = this.goto(curObj, dy/dx);
      if (curObj.active) {
        /*
         * while birdie going home,
         * I have already set a trap on its way home
         * if it triggered that trap, then it will
         * have to run back for its life.
         *  */
        curObj.trigTrap = true;
      //  curObj.force = curObj.defForce;
      }else {
        curObj.active = true;
      }
    }
  }

  init() {
    this.listen();
    const theme = new Theme();
    const chars = new Hex('FACE');
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

  listen() {
    $('#canvas').addEventListener('mousemove', evt => {
      this.mouse.setPos(evt.clientX, evt.clientY);
    }, false);
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
