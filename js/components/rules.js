import store from '../store';
import {render} from '../utils/render';

import AbstractView from '../abstract-view';
import Arrow from './arrow';

import {getUserStatistics} from '../sources';

class Rules extends AbstractView {
  get template() {
    return `
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>Ошибиться можно не более 3 раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    `;
  }

  bind(element) {
    const form = element.querySelector(`.rules__form`);

    form.addEventListener(`input`, this.onInputChange(element));
    form.addEventListener(`submit`, this.onSubmit(element));
  }

  onInputChange() {
    throw new Error(`onInputChange is not defined`);
  }
  onSubmit() {
    throw new Error(`onSubmit is not defined`);
  }
}

export default (...args) => {
  const view = new Rules();

  view.onInputChange = (element) => (event) => {
    const submitButton = element.querySelector(`.rules__button`);

    store.setValues({
      userName: event.target.value
    });

    if (event.target.value === ``) {
      submitButton.setAttribute(`disabled`, ``);

      return;
    }

    submitButton.removeAttribute(`disabled`);
  };

  view.onSubmit = (element) => (event) => {
    event.preventDefault();
    event.target.reset();

    getUserStatistics();

    const submitButton = element.querySelector(`.rules__button`);

    submitButton.setAttribute(`disabled`, ``);

    store.dispatch(`changeScreen`, {newScreen: `game`});
  };

  view.render({
    nodeName: `section`,
    id: `app-wrapper`,
    className: `app-wrapper`,
    elements: [
      () => render({
        nodeName: `header`,
        id: `header`,
        className: `header`,
        elements: [Arrow]
      }),
      () => render({
        nodeName: `section`,
        id: `rules`,
        className: `rules`,
        template: view.template,
      })
    ],
    isRerender: args.length !== 0
  });

  return view.element;
};
