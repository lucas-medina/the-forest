export default class Colors {
  static randomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = `rgba(${r},${g},${b}, 1)`;
    return color; 
  }
}