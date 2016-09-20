// Define appearance of geometry shapes

var Color = {
  C3: [255, 204, 92],  // yellow
  C1: [150, 206, 180], // green
  C2: [255, 238, 173], // paleYellow
  C4: [255, 111, 105], // orange
  getClr: function(_idx) {
    return Color['C' + _idx];
  }
}
