import Basics from './basics'
import BasicColorLines from './basic-color-lines';
import BasicsTwoTheAciddent from './basics-2-the-accident';

export default class CanvasRenderer {

  constructor(menu, canvasElem) {
    this.$menu = menu;
    this.canvasElem = canvasElem;
    this.canvasElem.width = window.innerWidth;
    this.canvasElem.height = window.innerHeight;
    this.currentCanvas;

    this.canvasList = [
      new Basics('Basics', canvasElem),
      new BasicColorLines('Color Lines #1', canvasElem),
      new BasicsTwoTheAciddent('Basics #2 (It was an accident!)', canvasElem)
    ];

    
    this.buildMenu();
    this.renderSelectedCanvas = this.renderSelectedCanvas.bind(this);
  }

  buildMenu() {
    this.canvasList.forEach(canvasInstance => {
      const { name, code } = canvasInstance;
      let link = document.createElement('a');
      link.href = `#${code}`;
      link.textContent = name;
      this.$menu.appendChild(link);
    });
  }

  renderSelectedCanvas(event) {
    const canvasId = window.location.hash.replace('#', '');
    const selectedCanvas = this.canvasList.find(item => item.code === canvasId);
    if (this.currentCanvas) {
      this.currentCanvas.clear();
    }
    this.currentCanvas = selectedCanvas;
    selectedCanvas.buildCanvas();
  }
}