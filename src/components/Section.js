export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(item) {
    this._container.prepend(item);
  };

  renderItems(initailArray) {
      initailArray.forEach(item => {
      this._renderer(item);
    });
  }

  tetsFunction() {
    console.log('test2');
  }
}