import Basics from './basics'

export default class CanvasRenderer {

  constructor(menu, canvasElem) {
    this.$menu = menu;
    this.canvasElem = canvasElem;
    this.canvasElem.width = window.innerWidth;
    this.canvasElem.height = window.innerHeight;

    this.canvasList = [
      new Basics('Basics', canvasElem)
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
    selectedCanvas.buildCanvas();
  }
}