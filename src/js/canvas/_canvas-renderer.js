import Basics from './basics'
import BasicColorLines from './basic-color-lines';
import BasicsTwoTheAciddent from './basics-2-the-accident';
import ColorLines2 from './color-lines-2';

export default class CanvasRenderer {

  constructor(menu) {
    this.$menu = menu;
    this.$slot = document.querySelector('#slot');
    this.canvasElem = document.querySelector('#canvas');
    this.canvasElem.width = window.innerWidth;
    this.canvasElem.height = window.innerHeight;
    this.currentCanvas;
    this.ready = false;

    this.canvasList = [
      // new Basics('Basics', this.canvasElem),
      new BasicColorLines('Color Lines #1', this.canvasElem),
      // new BasicsTwoTheAciddent('Basics #2 (It was an accident!)', this.canvasElem),
      // new ColorLines2('Color Lines #2', this.canvasElem)
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
      this.currentCanvas.unmount();
    }
    selectedCanvas.mount();
    this.canvasElem.setAttribute('data-code', selectedCanvas.code);
    this.currentCanvas = selectedCanvas;
  }
}