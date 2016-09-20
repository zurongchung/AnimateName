// Define appearance of geometry shapes

var Color = {
  C1: [206, 53, 0],     // Aviation Orange
  C2: [9, 86, 141],     // Blue
  C3: [255, 187, 0],    // Lemon Yellow
  C4: [69, 119, 37],    // Oxygen Tank Green
  getClr: function(_idx) {
    return Color['C' + _idx];
  },
  length: function() {
    return Object.keys(Color).length - 2;
  },
}
