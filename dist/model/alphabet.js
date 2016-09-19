/*

# Here is a series alphabet [a-z] & [A-Z]
# 'A*' representing the UTF-16 code unit value of the character
# 'w' short for 'width'. Is how wide each letter are.
# 'p' short for 'position', that defines the coordinates
      used to create geometry shapes
#
  HERE is the equation to find any coordinates on the slope of two points
    m = (y2-y1)/(x2-x1)
or  (y2-y1) = (x2-x1)m
*/


var Alphabet = {
    A65: {  // A
      w: 75,
      p: [[0,93,9], [6,78,6], [12,63,8], [18,48,8], [24,33,8], [30,19,6], [36,4,9]]
      //p: [[0,93,6], [8,73,8], [16,53,7], [24,33,6], [32,14], [40,-6], [48,-26,7], [56,-46,10]]
    },
    A73: { // I
      w: 63,
      p: [[100,12,12,40], [100,62,14,55]]
    }
}
