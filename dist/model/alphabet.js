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
      p: [[28,42,7],[35,25,7],[77,79,7],[7,105,7],[11,89,7],[33,85,7],
      [45,85,7],[59,85,7],[24,55,7],[43,7,7],[53,27,7],[69,63,7],
      [61,46,7],[88,107,7]],
    },
}
