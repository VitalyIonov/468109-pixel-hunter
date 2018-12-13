import store, {initialValues} from '../store';

import AbstractView from '../abstract-view';

class Arrow extends AbstractView {
  get template() {
    return `
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    `;
  }

  bind(element) {
    element.addEventListener(`click`, this.onClick);
  }

  onClick() {
    throw new Error(`onClick is not defined`);
  }
}

export default (...args) => {
  const view = new Arrow();

  view.onClick = () => {
    const {questions} = store.getValues();

    store.reset({
      ...initialValues,
      currentScreen: `greeting`,
      questions
    });
  };

  view.render({
    nodeName: `button`,
    id: `button-back`,
    className: `back`,
    template: view.template,
    isRerender: args.length !== 0
  });

  return view.element;
};
