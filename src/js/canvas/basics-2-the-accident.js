import CanvasTemplate from './_canvas-template';
import Colors from '../util/colors';

export default class BasicsTwoTheAciddent extends CanvasTemplate {

  constructor(name, canvasElem) {
    super(name, canvasElem);
    this.c2d = this.canvasElem.getContext('2d');
    this.size = 20;
    this.x = Math.ceil(Math.random() * 200);
    this.y = Math.ceil(Math.random() * 200);
    this.incrementor = 150;
    this.maxIncrementor = 300;
    this.spacingIterations = 300;
    this.vspeed = Math.ceil(Math.random() * this.maxIncrementor);
    this.hspeed = Math.ceil(Math.random() * this.maxIncrementor);
    this.goingDown = true;
    this.goingRight = true;
    this.debugAnimation = false;
  }

  rColor() {
    return Colors.randomColor();
  }

  init() {
    this.c2d.fillStyle = this.rColor();
    this.animate();
  }

  animate() {
    this.raf = window.requestAnimationFrame(this.move.bind(this));
  }

  redoDirectionalSpeeds() {
    this.vspeed = Math.ceil(Math.random() * this.maxIncrementor);
    // this.hspeed = Math.ceil(Math.random() * this.maxIncrementor);
    this.c2d.fillStyle = this.rColor();
    console.log(this.vspeed, this.hspeed);
  }

  move() {
    if (this.debugAnimation) {
      this.fpsControl += 1;
      if (this.fpsDebugMax === this.fpsControl) {
        this.fpsControl = 0;
      } else {
        this.animate();
        return;
      }
    }

    this.c2d.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);
    // this.paintBg();

    const { size } = this;
    const maxHeight = this.canvasElem.height;
    const maxWidth = this.canvasElem.width;
    const shouldRevertUp = this.goingDown && size + this.y >= maxHeight;
    const shouldRevertDown = !this.goingDown && size + this.y <= size;
    const shouldRevertLeft = this.goingRight && size + this.x >= maxWidth;
    const shouldRevertRight = !this.goingRight && size + this.x <= size;

    const collision = shouldRevertDown || shouldRevertLeft || shouldRevertRight || shouldRevertUp;
    if (collision) {
      this.redoDirectionalSpeeds();
    }

    this.goingDown = shouldRevertDown || shouldRevertUp ? !this.goingDown : this.goingDown;
    this.goingRight = shouldRevertRight || shouldRevertLeft ? !this.goingRight : this.goingRight;

    const verticalIncrementor = this.goingDown ? this.vspeed : -this.vspeed;
    const horizontalIncrementor = this.goingRight ? this.hspeed : -this.hspeed;

    for (let i = 0; i < this.spacingIterations; i++) {
      let hMovement = horizontalIncrementor / this.spacingIterations;
      let vMovement = verticalIncrementor / this.spacingIterations;
      let coordsAndSize = [this.x += hMovement, this.y += vMovement, size, size];
      this.c2d.globalAlpha = 1 / this.spacingIterations * (i + 1);
      this.c2d.fillRect(...coordsAndSize);
    }

    this.animate();
  }
}