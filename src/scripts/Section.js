export class Section {
  constructor({ items, renderer }, containerSelector, popup) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, position = 'append') {
    switch(position) {
    case 'append':
    this._container.append(element);
    return;
  case 'prepend':
    this._container.prepend(element);
    return;
  default:
    break;
    }
  }
}