import CanvasTemplate from './_canvas-template';
import Colors from '../util/colors';
import { Genius } from '../util/genius';

export default class BasicsTwoTheAciddent extends CanvasTemplate {

  constructor(name, canvasElem) {
    super(name, canvasElem);
    this.size = 40;
    this.sizeGrows = true;
    this.x = Genius.rng(200);
    this.y = Genius.rng(200);
    this.maxSpeed = 10;
    this.spacingIterations = 45;
    this.vspeed = Genius.rng(this.maxSpeed);
    this.hspeed = Genius.rng(this.maxSpeed);
    this.goingDown = true;
    this.goingRight = true;
  }

  rColor() {
    return Colors.randomColor();
  }

  canvasWillMount() {
    this.c2d.fillStyle = this.rColor();
  }

  bounce() {
    this.vspeed = Genius.rng(this.maxSpeed, this.maxSpeed === 100 ? 1 : this.maxSpeed - 5);
    this.hspeed = Genius.rng(this.maxSpeed, this.maxSpeed === 100 ? 1 : this.maxSpeed - 5);
    this.maxSpeed = this.maxSpeed === 100 ? this.maxSpeed : this.maxSpeed + 1;
    this.c2d.fillStyle = this.rColor();
    this.sizeGrows = this.size > 100 || this.size < 1 ? !this.sizeGrows : this.sizeGrows;
    this.size += this.sizeGrows ? 2 : -2;
    console.log(this.maxSpeed, this.vspeed, this.hspeed);
  }

  animate() {
    this.c2d.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);

    const { size } = this;
    const maxHeight = this.canvasElem.height;
    const maxWidth = this.canvasElem.width;
    const shouldRevertUp = this.goingDown && size + this.y >= maxHeight;
    const shouldRevertDown = !this.goingDown && size + this.y <= size;
    const shouldRevertLeft = this.goingRight && size + this.x >= maxWidth;
    const shouldRevertRight = !this.goingRight && size + this.x <= size;

    const collision = shouldRevertDown || shouldRevertLeft || shouldRevertRight || shouldRevertUp;
    if (collision) {
      this.bounce();
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
  }
}