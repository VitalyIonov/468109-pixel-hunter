// import {createElementFromTemplate, validate} from '../utils/main';
import {render} from '../utils/render';
// import {pubSub} from '../pubSub';
import store from '../store';

const listeners = [
  {
    targetSelector: `.game__content`,
    type: `change`,
    callback: () => {
      // return validate(form, [`question1`]) && pubSub.publish(`changeScreen`, `game3`);
    }
  }
];

const Game2 = ({answers}) => {
  const content = `
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
      ${answers.length}
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

  render({
    node: `section`,
    id: `game2`,
    className: `game`,
    template: content,
    listeners
  });
};

export default store.connect(Game2, [`answers`]);
