export default class CanvasTemplate {

  constructor(name, canvasElem) {
    this.name = name;
    this.code = name.replace(/\s/g, '-').replace(/[^A-Za-z0-9\-]/g, '').toLowerCase();
    this.canvasElem = canvasElem;
    this.c2d = this.canvasElem.getContext('2d');
    this.raf; // all requestAnimationFrame must point to this property
    this._mustAnimate = true;

    this._preAnimate = this._preAnimate.bind(this);
  }

  canvasWillMount() {
    // Dummy method, should be overwritten
  }

  canvasWillUnmount() {
    // Dummy method, should be overwritten
  }

  animate() {
    this._mustAnimate = false;
    throw new Error('This method cannot be used from canvasTemplate class');
  }

  _preAnimate() {
    if (!this._mustAnimate) {
      return;
    }
    this._litCanvas();
    this.animate();
    this.raf = window.requestAnimationFrame(this._preAnimate);
  }

  _litCanvas() {
    this.canvasElem.width = window.innerWidth;
    this.canvasElem.height = window.innerHeight;
  }

  _startRaf() {
    this.raf = window.requestAnimationFrame(this._preAnimate);
  }

  mount() {
    try {
      this._mustAnimate = true;
      this.canvasWillMount();
      this._startRaf();
    } catch(err) {
      throw err;
    }
  }

  unmount() {
    this.c2d.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);
    this.c2d.setTransform(1, 0, 0, 1, 0, 0);
    this._mustAnimate = false;
    window.cancelAnimationFrame(this.raf);
    this.canvasWillUnmount();
  }
}