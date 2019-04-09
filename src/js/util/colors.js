export default class Colors {
  static randomColor(opacity = 1) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = `rgba(${r},${g},${b}, ${opacity})`;
    return color; 
  }
}