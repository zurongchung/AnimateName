// Define appearance of geometry shapes

var Color = {
  C1: [174, 218, 75],    // green
  C2: [12, 144, 209],    // Preface Isolation
  C3: [206, 53, 0],      // Aviation Orange
  C4: [198, 12, 209],    // Oxygen Tank Green
  C5: [106, 12, 209],    // ghostwriter, primary
  C6: [24, 208, 175],    // mintasia
  getClr: function(_idx) {
    return this['C' + _idx];
  },
  length: function() {
    return Object.keys(this).length - 2;
  },
}
