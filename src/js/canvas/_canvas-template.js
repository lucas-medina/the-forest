export default class CanvasTemplate {

  constructor(name, canvasElem) {
    this.name = name;
    this.code = name.replace(/[^\w\s]/g, '-').replace(/\s/, '-').toLowerCase();
    this.canvasElem = canvasElem;
  }
  
  init() {
    console.log('If you see this log, something is definitely wrong');
  }

  buildCanvas() {
    try {
      this.init();
    } catch(err) {
      throw err;
    }
  }
}