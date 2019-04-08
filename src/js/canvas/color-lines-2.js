import CanvasTemplate from './_canvas-template'
import { Genius } from '../util/genius';

export default class ColorLines2 extends CanvasTemplate {
  constructor(name, canvasElem) {
    super(name, canvasElem);

    this.lineCount = 5;
    this.size = 25;
    this.speed = 1;
    
    this.extrudeList = [];
    this.animate = this.animate.bind(this);
  }

  canvasWillMount() {
    this.buildExtrudes();
  }

  buildExtrudes() {
    this.extrudeList = [];
    for (let i = 0; i < this.lineCount; i++) {
      let item = new Extrude(
        Genius.rng(window.innerWidth), 
        Genius.rng(window.innerHeight), 
        Genius.rng(this.speed + 50, 1) / 10, 
        this.size
      );
      this.extrudeList.push(item);
    }
  }

  animate() {
    this.extrudeList.forEach(extrude => {
      extrude.live(this.c2d);
    });
  }
  
}

class Extrude {
  constructor(x, y, speed, size) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.directions = {
      down: true,
      right: true
    }
  }

  live(c2d) {
    let {x, y, size, speed, directions } = this;
    c2d.fillStyle = 'rgba(0,0,0,.25)';
    c2d.fillRect(x, y, size, size);
    c2d.strokeStyle = '#fff';
    c2d.strokeRect(x, y, size, size);

    this.x += directions.right ? speed : -speed;
    this.y += directions.down ? speed : -speed;
    this.detectWalls();
  }

  detectWalls() {
    let { x, y, size, directions } = this;
    let hRevert = (directions.right && x + size >= window.innerWidth) || (!directions.right && x + size <= size);
    let vRevert = (directions.down && y + size >= window.innerHeight) || (!directions.down && y + size <= size);

    directions.right = hRevert ? !directions.right : directions.right;
    directions.down = vRevert ? !directions.down : directions.down;
  }

}