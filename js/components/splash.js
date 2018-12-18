import AbstractView from '../abstract-view';

import {getQuestions} from '../sources';

class SplashScreen extends AbstractView {
  constructor() {
    super();

    this.cursor = 0;
    this.symbolsSeq = `/—\\|`;
  }

  get template() {
    return `<div></div>`;
  }

  start() {
    this.cursor = ++this.cursor >= this.symbolsSeq.length ? 0 : this.cursor;
    this.element.textContent = this.symbolsSeq[this.cursor];
    this.timeout = setTimeout(() => this.start(), 50);
  }

  stop() {
    clearTimeout(this.timeout);
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
