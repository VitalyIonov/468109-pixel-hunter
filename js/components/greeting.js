import store from '../store';

import AbstractView from '../abstract-view';

class Greeting extends AbstractView {
  get template() {
    return `
      <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
      <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
      <div class="greeting__challenge">
        <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
        <p class="greeting__challenge-text">Правила игры просты:</p>
        <ul class="greeting__challenge-list">
          <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
          <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
          <li>Фотореализм обманчив и коварен.</li>
          <li>Помни, главное — смотреть очень внимательно.</li>
        </ul>
      </div>
    `;
  }

  bind(element) {
    const nextButton = element.querySelector(`.greeting__asterisk`);

    nextButton.addEventListener(`click`, this.onClick);
  }

  onClick() {
    throw new Error(`onClick is not defined`);
  }
}

export default (...args) => {
  const view = new Greeting();

  view.onClick = () => store.dispatch(`changeScreen`, {newScreen: `rules`});

  view.render({
    nodeName: `section`,
    id: `greeting`,
    className: `greeting central--blur`,
    template: view.template,
    isRerender: args.length !== 0
  });

  return view.element;
};
