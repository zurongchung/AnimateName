// Make alphabets By painting on the canvas
// output the points for alphabet.js

var Maker = {
  gdr: 1.618,
  defaultWidth  : 194,
  defaultHeight : 120,
  gridDivision  : 1,
  circleColor   : [237, 205, 107],
  primary       : 'rgb(93, 178, 221)',
  secondary     : 'rgb(175, 162, 93)',
  pointCollector: [],
  radi: 7,
  shiftedPoints : [],
};


Maker.draw = function () {
  // Mouse x and y will be the center of circle
  // output the coordinates
  // only those circle appeared on the screen
  if (Maker.nextOne()) {
    new Shape(Mouse.x, Mouse.y, Maker.radi, Maker.circleColor).draw();

    // collect points
    Maker.pointCollector.push([Mouse.x, Mouse.y, Maker.radi]);
  }
};
Maker.grid = function () {
  var gx = BubbleName.offsetX();
  var gy = BubbleName.offsetY();
  // alphabet width and height
  var aw = Maker.defaultWidth;
  var ah = Maker.defaultHeight;
  // left
  new Shape().lines(gx, gy, gx, gy + ah, Maker.primary);

  // right
  new Shape().lines(gx + aw, gy, gx + aw, gy + ah, Maker.primary);

  // center
  new Shape().lines(gx + (aw / 2), gy, gx + (aw / 2), gy + ah, Maker.primary);

  // left half center
  new Shape().lines(gx + (aw / 4), gy, gx + (aw / 4), gy + ah, Maker.secondary);

  // right half center
  new Shape().lines(gx + (aw * (3/4)), gy, gx + (aw * (3/4)), gy + ah, Maker.secondary);
};

Maker.frame = function () {
  // top
  new Shape().lines(0, BubbleName.offsetY(), BubbleName.w, BubbleName.offsetY(), Maker.primary);

  //center
  new Shape().lines(0, BubbleName.offsetY() + Maker.defaultHeight / 2,
  BubbleName.w, BubbleName.offsetY() + Maker.defaultHeight / 2, Maker.secondary);

  // bottom
  new Shape().lines(0, BubbleName.offsetY() + Maker.defaultHeight,
  BubbleName.w, BubbleName.offsetY() + Maker.defaultHeight, Maker.primary);

};

// outputs coordinates
Maker.output = function () {
  Maker.getShiftedPoints();
  for (var p of Maker.shiftedPoints) {
    board.innerHTML = board.innerHTML + '[' + p + ']' + ',';
  }
  // clear before run getShiftedPoints again
  // avoid previous asigned value did not clear
  Maker.shiftedPoints = [];
};
Maker.clearCollectPoint = function () {
  // prevent points still exsit
  // even after canvas has been cleaned up
  Maker.pointCollector = [];
};

Maker.getShiftedPoints = function () {
  /* low left circle shift to the edge of canvas
  # which is x = 0
  # and de top most circle move up to the edge of canvas
  # which is y = 0
  # and the rest of circle will shift same amount of value */
  var leftmost = Maker.pointCollector[0][0], topmost = Maker.pointCollector[0][1];
  // search the leftmost and topmost circle in an alphabet
  for (var val of Maker.pointCollector) {
    if (val[0] - leftmost < 0) {
      leftmost = val[0];
    }
    if (val[1] - topmost < 0) {
      topmost = val[1];
    }
  }
  // get index of leftmost and topmost coordinate in pointCollector
  var leftmostIndex, topmostIndex; // used to find that coordinate in pointCollector

  var i = 0, len = Maker.pointCollector.length;
  for (; i < len; ++i) {
    if (Maker.pointCollector[i].includes(leftmost)) {
      leftmostIndex = i;
    }
    if (Maker.pointCollector[i].includes(topmost)) {
      topmostIndex = i;
    }
  }
  //console.log(Maker.pointCollector[leftmostIndex][0]);
  //console.log(Maker.pointCollector[topmostIndex][1]);

  // align all points to left and top
  // shift by leftmost pixels and topmost pixels
  var shiftX = Maker.pointCollector[leftmostIndex][0] - Maker.pointCollector[leftmostIndex][2];
  var shiftY = Maker.pointCollector[topmostIndex][1] - Maker.pointCollector[topmostIndex][2];


  for (var arr of Maker.pointCollector) {
    var moved = arr.map(function (val, idx){
      if (idx === 0) {
        return val - shiftX;
      }
      if (idx === 1) {
        return val - shiftY;
      }
      return val;
    });
    Maker.shiftedPoints.push(moved);
  }
};

Maker.nextOne = function () {
  // if the length of slope between previous and next circle
  // is great than the radius of previous circle's radius
  // then draw
  var circleRadius = 7;
  var hrz = Mouse.x - Mouse.preX;
  var vrt = Mouse.y - Mouse.preY;
  var len = Math.round(Math.sqrt(Math.pow(hrz, 2) + Math.pow(vrt, 2)));
  return len - circleRadius >= -1 ? true : false;
};

Maker.remove = function () {
  // remove the coordinate by right click
  // find the closest circle of the coordinate
  // set by right click
  // Length of slope less than smallest radius
  // means that coordinate on the circle
  var trigSide, trigSide2, trigHypo;
  var closestCandidate = [];
  var i = 0, len = Maker.pointCollector.length;

  for (; i < len; ++i) {
    trigSide = Maker.pointCollector[i][0] - Mouse.x;
    trigSide2 = Maker.pointCollector[i][1] - Mouse.y;
    trigHypo = Module.getLenOfSlope(trigSide, trigSide2);
    // Length of slope less than smallest radius
    // means that coordinate on the circle
    // then get that circle into final compare list
    if (trigHypo < Maker.radi) {
      closestCandidate.push([i, trigHypo]);
    }
  }

  // find the closest circle
  var candidateLength = closestCandidate.length;
  if (candidateLength != 0) {
    var closest = closestCandidate[0][1], closestId = closestCandidate[0][0];
  }

  (function() {
    if (candidateLength > 1) {

      var j = 0;
      for (; j < candidateLength; ++j) {
        // if the first slope in the array is closest
        // following if statement will never trigger
        if (closestCandidate[j][1] - closest < 0) {
          closest = closestCandidate[j][1];
          closestId = closestCandidate[j][0];
        }
      }

    }
  })();

  // remove from pointCollector array
  // and redraw the circles
  if (candidateLength != 0) {
    Maker.pointCollector.splice(closestId, 1);
  }


};

Maker.redraw = function () {
  Maker.remove();
  BubbleName.draw();
  var i = 0;
  var len = Maker.pointCollector.length;
  try {
    for (;i < len; ++i) {

      var x = Maker.pointCollector[i][0];
      var y = Maker.pointCollector[i][1];
      var r = Maker.pointCollector[i][2];

      new Shape(x, y, r, Maker.circleColor).draw();
    }
  } catch (e) {
    console.error(" Maker-func-redraw ", e.message);
  }
};

// copy points into clipboard
Maker.copy = function () {
  var clipboard = new Clipboard('#clip');
  clipboard.on('success', function(e) {
      console.log(e);
  });
  clipboard.on('error', function(e) {
      console.log(e);
  });
};

Maker.shrinkBy = function (_div) {
  // shrink the width of a letter
  return Math.round(defaultHeight * gdr / _div);

};
