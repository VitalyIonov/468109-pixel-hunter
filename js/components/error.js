import store from '../store';

import AbstractView from '../abstract-view';

class ErrorScreen extends AbstractView {
  constructor(state) {
    super();

    this._state = state;
  }

  get template() {
    const {error} = this._state;

    return `
      <div class="end">
        <p>Произошла ошибка: ${error}</p>
      </div>`;
  }
}

export default store.connect((...args) => {
  const view = new ErrorScreen(...args);

  view.render({
    nodeName: `div`,
    id: `error`,
    className: `end`,
    template: view.template,
    isRerender: args.length !== 0
  });

  return view.element;
}, [`error`]);
