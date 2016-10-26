const docElem = document.documentElement;
class DeGuide {
  constructor(width=0,col=0,mb=0,mr=0,hgutter=0, height=0,row=0,mt=0,ml=0,vgutter=0) {
    [this.rows, this.columns] = [row, col];
    /**
     * guide width and height
     */
    [this.w, this.h] = [width, height];
    /**
     * gutters
     */
    [this.horizgaps, this.vertgaps]  = [hgutter, vgutter];
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
  algoQuickGuides(target) {
    let properties = [];    
    switch (target) {
      case 'left':
        properties = [0, 0, 0, 'V', this.canvasHeight];  
        break;
      case 'right':
        properties = [-1, this.canvasWidth, 0, 'V', this.canvasHeight];
        break;
      case 'top':
        properties = [0, 0, 0, 'H', this.canvasWidth];          
        break;
      case 'bottom':
        properties = [-1, 0, this.canvasHeight, 'H', this.canvasWidth];      
        break;     
      case 'row-mid':
        properties = [0.5, 0, this.canvasHeight/2, 'H', this.canvasWidth];
        break;
      case 'col-mid':
        properties = [0.5, this.canvasWidth/2, 0, 'V', this.canvasHeight];
        break; 
    }
    this.createGuides(...properties);    
  }
  createGuides(ord, dx,dy,orientation,to) {
    let line = document.createElementNS(this.xmlns, 'path');
    line.classList.add('gline');
    line.setAttribute('d', `M${dx} ${dy} ${orientation} ${to}`);
    line.setAttribute(`data-${orientation}-order`, ord);
    this.guides.push(line);
  }
  getGuides(target) {
    if (target == 'gen-btn') {
      this.runAlgorithm();
    }else {
      this.algoQuickGuides(target);
    }
    return this.guides; 
  }
}
class UI {
  constructor() {
    this.values = [];
    this.quickGuideIDs = ['left', 'row-mid', 'top', 'bottom',
    'col-mid', 'right'];
    this.IDs = ['width','columns', 'margin_bottom', 
    'margin_right', 'horiz_gutters','height', 'rows', 
    'margin_top', 'margin_left', 'vert_gutters'];
    this.elements = this.getValueFieldElements();
    this.pathParent = $('#groupGuides').self;
    this.againstNonNumbers = /[^\d]/;
    this.numbers = /\d/;
  }
  getValueFieldElements() {
    let node = [];
    for (let target of this.IDs) {
      let input_tag = $(`#${target}`).self;
      node.push(input_tag);
      $(`#${target}`).listenTo('blur', e => {
        if (!(this.againstNonNumbers.test(input_tag.value)) && input_tag.value != '') {
          input_tag.value += 'px';
        }
      });
    }
    return node;
  }
  /**
   * Have values from UI panel
   */
  getValues() {
    this.values = [];
    for (let node of this.elements) {
      let value = 0;
      if (this.numbers.test(node.value)) {
        value = parseInt(node.value);
      }
      this.values.push(value);
    }
    return this.values;
  }
  gen() {
    $('#gen-btn').listenTo('click', e => {
      let guideProp = this.getValues();
      let guide = new DeGuide(...guideProp);
      this.appendSelfTo(guide.getGuides(e.currentTarget.id));
    });
  }
  clear() {
    $('#clear-btn').listenTo('click', e => {
      while (this.pathParent.firstChild) {
        this.pathParent.removeChild(this.pathParent.firstChild);
      }
    });
  }
  quickGuide() {
    for (const id of this.quickGuideIDs) {
      $(`#${id}`).listenTo('click', e =>{
        this.appendSelfTo(new DeGuide().getGuides(e.currentTarget.id));        
      });
    }
  }
  attachListener() {
    this.gen();
    this.clear();
    this.quickGuide();
  }
  appendSelfTo(nodes) {
    this.pathParent.append(...nodes); // some browser may not support  `append()`    
  }
}
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  const ui = new UI();
  ui.attachListener();

});