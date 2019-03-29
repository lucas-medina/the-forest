import CanvasTemplate from './_canvas-template';

export default class Basics extends CanvasTemplate {

  constructor(name, canvasElem) {
    super(name, canvasElem);
    this.size = 50;
    this.x = 50;
    this.y = 50;
    this.incrementor = 10;
    this.c2d;
    this.goingDown = true;
  }

  init() {
    this.c2d = this.canvasElem.getContext('2d');
    this.c2d.fillStyle = '#000';
    this.animate();
  }

  animate() {
    this.raf = window.requestAnimationFrame(this.move.bind(this));
  }

  move() {
    this.c2d.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);

    const { size } = this;
    const maxHeight = this.canvasElem.height;
    const shouldRevertUp = this.goingDown && size + this.y >= maxHeight;
    const shouldRevertDown = !this.goingDown && size + this.y <= size;

    this.goingDown = shouldRevertDown || shouldRevertUp ? !this.goingDown : this.goingDown;
    const verticalIncrementor = this.goingDown ? this.incrementor : -this.incrementor;

    let coordsAndSize = [this.x += 1, this.y += verticalIncrementor, size, size];
    this.c2d.fillRect(...coordsAndSize);

    this.animate();
  }
}