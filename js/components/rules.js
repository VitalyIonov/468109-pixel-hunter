import store from '../store';
import {render} from '../utils/render';

import Arrow from './arrow';

const listeners = [
  {
    targetSelector: `.rules__form`,
    type: `input`,
    callback: (event) => {
      const submitButton = document.querySelector(`.rules__button`);

      if (event.target.value === ``) {
        submitButton.setAttribute(`disabled`, ``);

        return;
      }

      submitButton.removeAttribute(`disabled`);
    }
  },
  {
    targetSelector: `.rules__form`,
    type: `submit`,
    callback: (event) => {
      event.preventDefault();
      event.target.reset();

      const submitButton = document.querySelector(`.rules__button`);

      submitButton.setAttribute(`disabled`, ``);

      store.dispatch(`changeScreen`, {newScreen: `game1`});
    }
  },
];

const Rules = () => {
  const content = `
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

  return render({
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
        template: content,
        listeners
      })
    ],
  });
};

export default Rules;
