export class Section {
  constructor({ items, renderer }, containerSelector, popup) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._popup = popup;
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item, this._popup);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}