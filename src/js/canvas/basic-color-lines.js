import CanvasTemplate from './_canvas-template';
import Colors from '../util/colors';

export default class BasicColorLines extends CanvasTemplate {

  constructor(name, canvasElem) {
    super(name, canvasElem);
    this.size = 25;
    this.x = Math.ceil(Math.random() * 200);
    this.y = Math.ceil(Math.random() * 200);
    this.maxIncrementor = 150;
    this.spacingIterations = 150;
    this.vspeed = Math.ceil(Math.random() * this.maxIncrementor);
    this.hspeed = Math.ceil(Math.random() * this.maxIncrementor);
    this.goingDown = true;
    this.goingRight = true;
  }

  rColor() {
    return Colors.randomColor();
  }

  redoDirectionalSpeeds() {
    this.vspeed = Math.ceil(Math.random() * this.maxIncrementor);
    this.hspeed = Math.ceil(Math.random() * this.maxIncrementor);
    this.c2d.fillStyle = this.rColor();
  }

  animate() {

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
      this.c2d.fillRect(...coordsAndSize);
    }
  }
}