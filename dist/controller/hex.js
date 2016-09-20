// Turn characters into UTF-16/hex code representing each letter
// Return a series number representing that phrase in String format

function LetterToHex(_phrase) {
  this.words = _phrase;
  this.length = this.words.length;
  this.hex = this.letHex();
}


LetterToHex.prototype.letHex  = function() {
  var hex_str = '';
  for( var i = 0; i < this.length; i++) {
    hex_str += this.words.charCodeAt(i);
  }
  return hex_str;
};

// Return Hex code that represente that phrase
// To the requestor
LetterToHex.prototype.getHex = function() {
   return this.hex;
}
