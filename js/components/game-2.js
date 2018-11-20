import {Arrow, arrowListeners, Timer, Lives} from './header/index';
import Game3 from './game-3';
import {createElementFromTemplate, validate, render} from '../utils/main';

const template = `
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
`;

const Game2 = createElementFromTemplate([
  {
    node: `header`,
    className: `header`,
    elements:
      [
        {elem: Arrow, listeners: arrowListeners},
        {elem: Timer},
        {elem: Lives}
      ]
  },
  {
    node: `section`,
    className: `game`,
    elements: template
  }
]);

const form = Game2.querySelector(`.game__content`);

form.addEventListener(`change`, () =>
  validate(form, [`question1`]) && render(Game3));

export default Game2;
