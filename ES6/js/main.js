document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded...');
  const hex = new Hex('AB');
  console.log(hex.hex);
  console.log(hex.length);
  const point = new Point(hex.hex[0]);
  console.log(point.manyPoints);
  console.log(point.width);
  console.log(point.point(0));
  console.log(point.x(0));
  console.log(point.y(0));
  console.log(point.radius(0));
  console.log(point.tone(0));
});
