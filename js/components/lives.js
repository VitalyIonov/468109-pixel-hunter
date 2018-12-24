import store from '../store';
import {LIVE_COUNT} from '../constants/initial-options';

import AbstractView from '../abstract-view';

class Lives extends AbstractView {
  constructor(state) {
    super();

    this._state = state;
  }

  get template() {
    const {lives} = this._state;

    if (lives < 0) {
      return null;
    }

    return `
      ${new Array(LIVE_COUNT - lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(` `)}
      ${new Array(lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(` `)}
    `;
  }
}

export default store.connect((...args) => {
  const view = new Lives(...args);

  view.render({
    nodeName: `section`,
    id: `lives`,
    className: `game__lives`,
    template: view.template,
    isRerender: args.length !== 0
  });

  return view.element;
}, [`lives`]);
