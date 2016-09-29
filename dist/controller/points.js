// Fecth shape coordinates from alphabet.js

var Point = {
  numOfShape: function (_at) {
    // get the length of the key of [p]
    // indicates how many shape needs to draw
    return Alphabet['A' + _at]['p'].length;
  },
  getWidth: function (_at) {
    // How wide the letter is
    return Alphabet['A' + _at]['w'];
  },
  getPoint: function(_at, _idx) {
    return Alphabet['A' + _at]['p'][_idx];
  },
  getX: function (_at, _idx) {
    return Alphabet['A' + _at]['p'][_idx][0];
  },
  getY: function (_at, _idx) {
    return Alphabet['A' + _at]['p'][_idx][1];
  },
  getRadi: function (_at, _idx) {
    // The radius of circle
    return Alphabet['A' + _at]['p'][_idx][2];
  },
  getTone: function (_at, _idx) {
    // Color Tone(AKA value) used to change the Brightness of color
    return Alphabet['A' + _at]['p'][_idx][3];
  },
}
