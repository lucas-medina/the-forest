import Basics from './canvas/basics.js'
import CanvasRenderer from './canvas/_canvas-renderer';

class Forest { 
  constructor() {
    this.className = 'menu-open';
    this.$menuLink = document.querySelector('.header__link');
    this.$page = document.querySelector('.page');
    this.$menu = document.querySelector('.menu');

    this.canvasRenderer = new CanvasRenderer(this.$menu);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.$menuLink.addEventListener('click', this.toggleMenu);
    window.addEventListener('hashchange', this.canvasRenderer.renderSelectedCanvas);
    if (window.location.hash) {
      this.canvasRenderer.renderSelectedCanvas();
    }
  }

  toggleMenu() {
    const { $page, className } = this;
    $page.classList.toggle(className);
  }
}

var Application = new Forest().init();