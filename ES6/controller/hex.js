/*
 * Turn characters into UTF-16/hex code representing each letter
 * Return a series number representing that phrase in String format
 */

class Hex {
  constructor(phrase) {
    this.phrase = phrase;
  }
  get length() {
    return this.phrase.length;
  }
  get codes() {
    /*
     *  return hex codes array represent the phrase
     *  to the requestor
     */
    return this.convertToUTF16();
  }
  get wide() {
    var total = 0;
    for (const c of this.codes) {
       total += new Point(c).width;
    }
    return total;
  }
  get tall() {
    return new Point(this.codes[0]).height;
  }
  convertToUTF16() {  // => Array
    let hexcodes = new Array();
    for (let i = 0; i < this.length; i++) {
      hexcodes.push(this.phrase.charCodeAt(i));
    }
    return hexcodes;
  }


}
