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
      p: [[0,93], [5,81], [10,68], [15,56], [20,43], [25,31], [30,19], [35,6]]
    },
    A73: { // I
      w: 63,
      p: [[100,12,12,40], [100,62,14,55]]
    }
}
