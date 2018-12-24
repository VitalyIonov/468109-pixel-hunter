import AbstractView from '../abstract-view';

import {getQuestions} from '../sources';

class SplashScreen extends AbstractView {
  constructor() {
    super();

    this._cursor = 0;
    this._symbolsSeq = `/—\\|`;
  }

  get template() {
    return `<div></div>`;
  }

  start() {
    this._cursor = ++this._cursor >= this._symbolsSeq.length ? 0 : this._cursor;
    this.element.textContent = this._symbolsSeq[this.cursor];
    this._timeout = setTimeout(() => this.start(), 50);
  }

  stop() {
    clearTimeout(this._timeout);
  }
}

export default (...args) => {
  const view = new SplashScreen();

  view.render({
    nodeName: `section`,
    id: `splash`,
    className: `splash`,
    template: view.template,
    isRerender: args.length !== 0
  });

  view.start();

  getQuestions().then(view.stop());

  return view.element;
};
