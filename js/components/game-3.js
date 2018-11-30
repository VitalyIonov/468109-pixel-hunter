// import {createElementFromTemplate} from '../utils/main';
import {render} from '../utils/render';
// import {pubSub} from '../pubSub';
import store from '../store';

const listeners = [
  {
    targetSelector: `.game__content`,
    type: `change`,
    callback: () => {
      // pubSub.publish(`changeScreen`, `stats`);
    }
  }
];

const Game3 = ({answers}) => {
  const content = `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
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
    id: `game3`,
    className: `game`,
    template: content,
    listeners
  });
};

export default store.connect(Game3, [`answers`]);
