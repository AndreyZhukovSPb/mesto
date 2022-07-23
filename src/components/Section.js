export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
  };

  addItem(item) {
    this._container.prepend(item);
  };

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}