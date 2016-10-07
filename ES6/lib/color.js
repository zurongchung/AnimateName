/*---------------
 * Color Themes
 *----------------*/

 class Theme {
   constructor() {
     this.theme = new Map(this.colors);
     this.length = this.theme.size;
   }
   get colors() {
     return [[1, [174, 218, 75]],    // green
             [2, [12, 144, 209]],    // Preface Isolation
             [3, [206, 53, 0]],      // Aviation Orange
             [4, [198, 12, 209]],    // Oxygen Tank Green
             [5, [106, 12, 209]],    // ghostwriter, primary
             [6, [24, 208, 175]],    // mintasia
           ];
   }
 }
