import store from '../store';

import AbstractView from '../abstract-view';

class Intro extends AbstractView {
  get template() {
    return `
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    `;
  }

  bind(element) {
    const button = element.querySelector(`.intro__asterisk`);

    button.addEventListener(`click`, this.onClick);
  }

  onClick() {
    throw new Error(`onClick is not defined`);
  }
}

export default (...args) => {
  const view = new Intro();

  view.onClick = () => {
    store.dispatch(`changeScreen`, {newScreen: `greeting`});
  };

  view.render({
    nodeName: `section`,
    id: `intro`,
    className: `intro`,
    template: view.template,
    isRerender: args.length !== 0
  });

  return view.element;
};
