import CanvasTemplate from './_canvas-template';
import { Genius } from '../util/genius';

let ParticleList = [];

export default class BreakingChrome extends CanvasTemplate {

  constructor(name, canvasElem) {
    super(name, canvasElem);
    this.size = 20;
    this.particleCount = 50;
  }

  canvasWillMount() {
    ParticleList = [ new ChromeBreaker(this.c2d, 10, 10, 10, this.size) ];
  }

  animate() {
    this.c2d.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);
    ParticleList.forEach(item => {
      item.survive();
    });
  }
}

class ChromeBreaker {
  constructor(c2d, x, y, speed, size, reverse = false) {
    this.id = (Math.ceil(Math.random() * 999)).toString(16);
    
    this.c2d = c2d;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;

    this.spawnCount = 1;
    this.hp = 1;
    this.directions = {
      down: reverse ? false : true,
      right: reverse ? false : true
    }

    this.createSentience();
  }

  createSentience() {
    console.log('Chrome Breaker', this.id, '... Am I alive?');
  }

  detectCollision() {
    let hRevert = this.size + this.x > window.innerWidth || this.size + this.x < this.size;
    let vRevert = this.size + this.y > window.innerHeight || this.size + this.y < this.size;

    this.directions.down = vRevert ? !this.directions.down : this.directions.down;
    this.directions.right = hRevert ? !this.directions.right : this.directions.right;

    if (hRevert || vRevert) {
      this.hp--;
      console.log('Oww..!, HP:', this.hp);
      this.emergencyReproduction();
    }
  }

  emergencyReproduction() {
    for (let i = 0; i < this.spawnCount; i++) {
      ParticleList.push(new ChromeBreaker(this.c2d, this.x, this.y, Genius.rng(25, 1), this.size, true));
    }
  }

  draw() {
    this.x += this.directions.right ? this.speed : -this.speed;
    this.y += this.directions.down ? this.speed : -this.speed;
    this.c2d.fillStyle = '#fff';
    this.c2d.fillRect(this.x, this.y, this.size, this.size);
  }

  checkDamage() {
    if (this.hp === 0) {
      this.die();
    }
  }

  survive() {
    this.checkDamage();
    this.draw();
    this.detectCollision();
  }

  die() {
    console.log('Ill never forget you');
    ParticleList = ParticleList.filter(item => item.id !== this.id);
  }
}