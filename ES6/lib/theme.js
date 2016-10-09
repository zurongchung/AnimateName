/*---------------
 * Color Themes
 *----------------*/

 class Theme {
   constructor() {
     this.color = new Map(this.theme);
   }
   get theme() {
     return [[0, [174, 218, 75]],    // green
             [1, [12, 144, 209]],    // Preface Isolation
             [2, [206, 53, 0]],      // Aviation Orange
             [3, [198, 12, 209]],    // Oxygen Tank Green
             [4, [106, 12, 209]],    // ghostwriter, primary
             [5, [24, 208, 175]],    // mintasia
           ];
   }
   get length() {
     return this.color.size;
   }
  rgb(index) {
    let values = this.color.get(index);
     return  `rgb(${values.join(',')})`;
   }
 }
