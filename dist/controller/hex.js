// Turn characters into UTF-16/hex code representing each letter
// Return a series number representing that phrase in String format

function LetHex(_phrase) {
  var hex_str = '';
  var len = _phrase.length
  for( var i = 0; i < len; i++) {
    hex_str += _phrase.charCodeAt(i);
  }
  return hex_str;
}

// Return Hex code that represente that phrase
// To the requestor
function getHex(_phrase) {
   return LetHex(_phrase);
}
