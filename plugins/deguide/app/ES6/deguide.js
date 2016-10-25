const docElem = document.documentElement;
class DeGuide {
  constructor(row=0, col=0, w=0, h=0, hg=0, vg=0, ml=0, mr=0, mt=0, mb=0) {
    [this.rows, this.columns] = [row, col];
    /**
     * guide width and height
     */
    [this.w, this.h] = [w, h];
    /**
     * gutters
     */
    [this.horizgaps, this.vertgaps]  = [hg. vg];
    /**
     * Margins
     */
    [this.ml, this.mr] = [ml, mr];
    [this.mt, this.mb] = [mt, mb];
    /**
     * movement
     */
    [this.canvasWidth, this.canvasHeight] = [docElem.clientWidth, docElem.clientHeight]; 
    [this.dx, this.dy] = [0, 0];
    [this.x, this.y]   = [this.canvasWidth, this.canvasHeight];
    /**
     * A collection of guides
     */
    this.guides = [];
    this.xmlns = "http://www.w3.org/2000/svg";
  }
  runAlgorithm() {
    //this.w = 60;
    //this.columns = 5
    //this.horizgaps = 10;
    this.rows = 5;
    //this.h = 40;
    this.vertgaps = 10;
    //this.fullScreen();

    (!this.columns && !this.w) ? console.log('Skip columns') : this.algoColumns();
    (!this.rows && !this.h) ? console.log('Skip rows') : this.algoRows();
    
  }
  /**
   * Algorithm to draw columns and rows
   * Require: 
   * => columns or width
   * => rows or height
   */
  algoColumns() {
    let canvasWidth = this.canvasWidth -this.ml -this.mr;
    if (!this.columns && this.w) {
      /**
       * calculate columns if only width is known */
      this.columns = canvasWidth / this.w;
    }else if(this.columns && !this.w) {
      /**
       * calculate width if only columns are known */
      this.w = canvasWidth / this.columns;
    }

    let i = 0;
    for (; i <= this.columns; i++) {
      this.dx = i * (this.w + this.horizgaps) + this.ml;
      let prop = [this.dx, 0, 'V', this.y];
      this.createGuides(i, ...prop);
      if (!!this.horizgaps) {
        prop[0] += this.horizgaps;
        this.createGuides(i+0.5, ...prop);
      }
    }
  }
  algoRows() {
    let canvasHeight = this.canvasHeight -this.mt -this.mb;
    if (!this.rows && this.h) {
      /**
       * calculate rows if only height is known */
      this.rows = canvasHeight / this.h;
    }else if (this.rows && !this.h) {
      /**
       * calculate height if only rows are known */
      this.h = canvasHeight / this.rows;
    }

    let i = 0;
    for (; i <= this.rows; i++) {
      this.dy = i * (this.h + this.vertgaps) + this.mt;
      let prop = [0, this.dy, 'H', this.x];
      this.createGuides(i, ...prop);
      if (!!this.vertgaps) {
        prop[1] += this.vertgaps;
        this.createGuides(i+0.5, ...prop);
      }
    }
  }
  createGuides(ord, dx,dy,orientation,to) {
    let line = document.createElementNS(this.xmlns, 'path');
    line.classList.add('gline');
    line.setAttribute('d', `M${dx} ${dy} ${orientation} ${to}`);
    line.setAttribute(`data-${orientation}-order`, ord);
    this.guides.push(line);
  }
  getGuides() {
    this.runAlgorithm();
    return this.guides; 
  }
  gen() {

  }
  draw() {

  }
  
}
class SVG {
  constructor(nodes) {
    this.nodes = nodes;
  }
  appendSelfTo() {
    let svg = $('#guidesBox').self;
    svg.append(...this.nodes); // some browser may not support  `append()`    
  }
}
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  let [w, h] = [docElem.clientWidth, docElem.clientHeight];
  const guides = new DeGuide();
  const svg = new SVG(guides.getGuides());
  svg.appendSelfTo();
});