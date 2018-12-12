import store from '../store';

import {checkStatus} from '../utils/main';

import AbstractView from '../abstract-view';

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

  window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => {
      store.setValues({
        questions: data
      });

      store.dispatch(`changeScreen`, {newScreen: `greeting`});
    })
    .catch((error) => {
      store.setValues({
        error
      });

      store.dispatch(`changeScreen`, {newScreen: `error`});
    })
    .then(view.stop());

  return view.element;
};
