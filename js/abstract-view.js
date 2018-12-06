import {render} from './utils/render';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get element() {
    this.bind(this._element);

    return this._element;
  }

  get template() {
    throw new Error(`Template is required`);
  }

  bind() {

  }

  render(nodeOptions) {
    if (this._element) {
      return;
    }

    this._element = render(nodeOptions);
  }
}

export default AbstractView;
