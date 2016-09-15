// Fecth shape coordinates from alphabet.js

var Letter = {
  x : 0,
  y : 0,
  z : 0,
  numOfShape: function (_at) {
    // get the length of the key of [p]
    // indicates how many shape needs to draw
    return Alphabet['A' + _at]['p'].length;
  },
  width: function (_at) {
    // How wide the letter is
    return Alphabet['A' + _at]['w'];
  }
}
