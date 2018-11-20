import {Arrow, arrowListeners} from './header/index';
import Game1 from './game-1';
import {createElementFromTemplate, render} from '../utils/main';

const template = `
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

const Rules = createElementFromTemplate([
  {
    node: `header`,
    className: `header`,
    elements: [{elem: Arrow, listeners: arrowListeners}]
  },
  {
    node: `section`,
    className: `rules`,
    elements: template
  }
]);

const form = Rules.querySelector(`.rules__form`);
const input = Rules.querySelector(`.rules__input`);
const submitButton = Rules.querySelector(`.rules__button`);

form.addEventListener(`submit`, (event) => {
  event.preventDefault();

  render(Game1);
});

input.addEventListener(`input`, (event) => {
  if (event.target.value === ``) {
    submitButton.setAttribute(`disabled`, ``);

    return;
  }

  submitButton.removeAttribute(`disabled`);
});

export default Rules;
