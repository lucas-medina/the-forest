export default class CanvasTemplate {

  constructor(name, canvasElem) {
    this.name = name;
    this.code = name.replace(/\s/g, '-').replace(/[^A-Za-z0-9\-]/g, '').toLowerCase();
    this.canvasElem = canvasElem;
    this.c2d = this.canvasElem.getContext('2d');
    this.debugAnimation = false;
    this.fpsControl = 0;
    this.fpsDebugMax = 15;
    this.raf; // all requestAnimationFrame must point to this property
  }
  
  init() {
    console.log('If you see this log, something is definitely wrong');
  }

  clear() {
    console.log('stopping', this.name);
    this.c2d.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);
    window.cancelAnimationFrame(this.raf);
  }

  resetTransform() {
    this.c2d.setTransform(1, 0, 0, 1, 0, 0);
  }

  buildCanvas() {
    try {
      console.log('Beginning', this.name);
      this.init();
    } catch(err) {
      throw err;
    }
  }
}