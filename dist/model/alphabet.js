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
    A65: { // A
      w: 97,
      p: [[8,107,8],[44,11,11],[29,53,7],[21,74,8],[14,92,6],[36,37,9],
      [56,40,7],[84,106,9],[77,83,8],[68,67,6],[62,53,7],[35,88,6],
      [49,90,6],[64,88,6],],
    },
    A66: {  // B
      w: 97,
      p: [[12,5,9],[10,39,7],[10,22,6],[9,56,7],[7,110,8],[7,69,6],
      [6,81,6],[7,93,6],[32,5,5],[55,7,5],[76,21,5],[76,34,5],[69,44,5],
      [56,53,5],[40,56,6],[25,55,6],[69,64,6],[30,111,10],[56,104,9],[76,93,7],
      [81,77,7],],
    },
}
