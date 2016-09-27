// Turn characters into UTF-16/hex code representing each letter
// Return a series number representing that phrase in String format

function LetterToHex(_phrase) {
  this.words = _phrase;
  this.length = _phrase.length;
  this.hex = this.letHex();
}


LetterToHex.prototype.letHex  = function() {
  var hex_arr = [];
  for( var i = 0; i < this.length; i++) {
    hex_arr.push(this.words.charCodeAt(i));
  }
  return hex_arr;
};

// Return Hex code that represente that phrase
// To the requestor
LetterToHex.prototype.getHex = function() {
   return this.hex;   // return an array
}
LetterToHex.prototype.getLength = function () {
  return this.length;
};
