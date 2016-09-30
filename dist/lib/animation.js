// Animations trigger by mouse event

// cross browser support
window.rAF = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var cAF = window.cancelAnimationFrame ||
          window.mozCancelAnimationFrame;
//  id of window.requestAnimationFrame
//  for terminate animation
var rAF_id;
var Animation = {
  x  : 0,
  y  : 0,
  radi: 0,
  dx : 0,
  dy : 0,
  beta : 0,
  // touch point
  tcx : 0,
  tcy : 0,
  tmx : 0,
  tmy : 0,
  // length of hypotenuse on each circle
  ls1 : 0,
  ls2 : 0,
  ls3 : 0,

  vx : 1,
  vy : 0,
  gravity : 0.02,
  points: [], // 3  dimensional array
  animatable: [], // 0: the letter that point belongs to. 1: the point index on that array
};

// fetch points from alphabet database when app started.
// Never call it from animation
Animation.collectPoints = function() {
  // clear previous collected points when user changes the inputs
  Animation.points = [];
  var letterWidth = 0, spacing = 0;
  var letter = 0;
  for(; letter < BubbleName.numOfLetters(); ++letter) {
    var index = 0;
    var tmp = [];
    var at = BubbleName.charAt()[letter];
    //tmp.push(Point.getWidth(at));
    for(; index < Point.numOfShape(at); ++index) {
      var xyr = [];
      xyr.push(Point.getX(at, index) + BubbleName.offsetX() + letterWidth + spacing);
      xyr.push(Point.getY(at, index) + BubbleName.offsetY());
      xyr.push(Point.getRadi(at, index));
      tmp.push(xyr);
    }
    letterWidth += Point.getWidth(at);
    spacing += BubbleName.spacing;
    Animation.points.push(tmp);
  }
};

Animation.draw = function() {
  BubbleName.resetCanvas();
  if ( Animation.animatable.length != 0 ) {
    Animation.update();
  }
  Animation.bounce();
};
// core drawing function
Animation.bounce = function() {
  // use the collected points from database
  // to draw shapes

  try {
    var color = 1;
    // length of Animation.points is depends on how many letters
    var letter = 0;
    for(; letter < Animation.points.length; ++letter) {
      var i = 0;
      for (; i < Animation.points[letter].length; ++i) {
        //Animation.points[letter].length
        // Animation.x and Animation.y is a copy of the point coordinate
        // In order to animating shapes, we need to change the actual coordinates
        // inside the original array
        Animation.x = Animation.points[letter][i][0];
        Animation.y = Animation.points[letter][i][1];
        Animation.radi = Animation.points[letter][i][2];

        Animation.ls1 = Event.Mouse.ir;
        Animation.ls2 = Animation.radi;

        // this is how one circle moves around the other circle
        // The distance relationship between two circles
        Animation.dx = Event.Mouse.x - Animation.x;
        Animation.dy = Event.Mouse.y - Animation.y;
        Animation.ls3 = Module.getLenOfSlope(Animation.dx, Animation.dy);
        Animation.touchPoints();
        Animation.drawTouchPoints();   // Don't need. Delete it at release stage


        if (Animation.hasTouched()) {
          //Animation.update();
          //Animation.bouncing();
          Animation.addAnimatable(letter, i);


        }
        Animation.vx += Animation.gravity;


        // visual center of circles
        new Shape(Animation.x, Animation.y,2, Color.getClr(2)).draw();

        new Shape(Animation.x,Animation.y,Animation.radi,Color.getClr(color)).draw('stroke');
      }
      if(color > Color.length()) {
        color = 1;
      }
      ++color;
    }
  } catch (e) {
    console.error(" Ani-func-bounce ", e.message);
  }
};
Animation.addAnimatable = function(_letter, index) {
  var tmp = [];
  tmp.push(_letter, index);
  // the point already in the animatable list?
  if( !Animation.animationPointExist(tmp) ) {
    Animation.animatable.push(tmp);
    console.log(Animation.animatable);
  }
};

Animation.removeFromAnimatable = function() {

};

Animation.animationPointExist = function(_arr) {
  // the point already in the animatable list?
  var a = 0;
  for(; a < Animation.animatable.length; ++a) {
    if ( Animation.animatable[a].includes(_arr[0],0) &&
    Animation.animatable[a].includes(_arr[1],1) ) {
      // if matched
      return true;
    }
  }
  // if no match
  return false;
};

Animation.update = function() {
  if (Animation.tcx < Event.Mouse.x) {Animation.vx *= -1;}
  //Animation.points[letter][i][0] = Animation.tmx - Animation.radi;
  //Animation.points[letter][i][1] = Animation.tmy - Animation.radi;
  // updating coordinates in points array
  var i = 0;
  for (; i < Animation.animatable.length; ++i) {
    var atLetter = Animation.animatable[i][0];
    var atPoint = Animation.animatable[i][1];
    Animation.points[atLetter][atPoint][0] += Animation.vx;
    if(Animation.vx != 0){
      var y2 = Module.dot2(Animation.bouncePath(Animation.points[atLetter][atPoint][0]));
      Animation.points[atLetter][atPoint][1] = y2;
    }
  }

};
Animation.bouncing = function() {

};

Animation.bouncePath = function(_x2) {
  // y2 = (x2 - x1) * slope + y1
  return Module.dot2((_x2 - Animation.x) * Animation.haslope() + Animation.y);
};

Animation.haslope = function() {
  return Animation.x === Event.Mouse.x || Animation.y === Event.Mouse.y ? 0 : Module.dot2((Animation.dy / Animation.dx));
};

Animation.touchPoints = function(){
  // Denominator can't be zero;
  // the angle used to calculate touch points
  // on the shape and on the invisible circle of the mouse
  if (Animation.yLess()) {
    Event.Mouse.theta = Module.dot2((Math.PI - Math.atan(Animation.dx / Animation.dy)) * -1);
    Animation.beta = Module.dot2(Math.atan(Animation.dx / Animation.dy));
  }else {
    Event.Mouse.theta = Module.dot2(Math.atan(Animation.dx / Animation.dy));
    Animation.beta = Module.dot2((Math.PI-Math.atan(Animation.dx / Animation.dy)) * -1);
  }

  // touche point coordinates
  if (Animation.y === Event.Mouse.y) {
    // Fix the buggy when mouse and circles Y coordinates are the same;
    var mr = Event.Mouse.ir;
    var cr = -Animation.radi;
    if (Animation.xLess()) {mr *= -1; cr *= -1;}
    Animation.tmx = Event.Mouse.x + mr;
    Animation.tmy = Event.Mouse.y;
    Animation.tcx = Animation.x + cr;
    Animation.tcy = Animation.y;
  }else {
    // on circles
    Animation.tcx = Module.dot2(Math.sin(Animation.beta) * Animation.radi +
    Animation.x);

    Animation.tcy = Module.dot2(Math.cos(Animation.beta) * Animation.radi +
    Animation.y);
    // on mouse
    Animation.tmx = Module.dot2(Math.sin(Event.Mouse.theta) * Event.Mouse.ir +
    Event.Mouse.x);

    Animation.tmy = Module.dot2(Math.cos(Event.Mouse.theta) * Event.Mouse.ir +
     Event.Mouse.y);
  }
};
Animation.hasTouched = function() {
  var inCircle = Animation.ls2 + Animation.ls1;
  var t = Math.floor(Animation.ls3 - inCircle);
  //if (t >= 0 && t < 1) {
  //  console.log(t);
  //}
  return t >= 0 && t < 1;
};

Animation.drawTouchPoints = function() {
  // lines helps visualize the relationship between shapes
  new Shape().lines(Event.Mouse.x, Event.Mouse.y, Animation.tcx, Animation.tcy);
  //new Shape().lines(Animation.x, Animation.y, Animation.x, Event.Mouse.y);
  //new Shape().lines(Animation.x, Event.Mouse.y, Event.Mouse.x, Event.Mouse.y);

  // touche points
  new Shape(Animation.tcx, Animation.tcy, 3, Color.getClr(2)).draw();
  new Shape(Animation.tmx,Animation.tmy, 3, Color.getClr(4)).draw();
};
Animation.xLess = function() {
  return Animation.x < Event.Mouse.x;
};
Animation.yLess = function() {
  return Animation.y < Event.Mouse.y;
};
