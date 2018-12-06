import {render} from '../utils/render';
import {QUESTIONS} from '../constants/questions';
import store from '../store';
import marks from './marks';
import questionBlock from './question-block';

import AbstractView from '../abstract-view';
import Arrow from './arrow';
import Timer from './timer';
import Lives from './lives';

class Game3 extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get template() {
    const {answers} = this.state;

    const question = QUESTIONS[answers.length];

    return `
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content game__content--triple">
        ${question && questionBlock(question, 3)}
      </form>
      ${marks(answers)}
    `;
  }

  bind(element) {
    const form = element.querySelector(`.game__content`);

    form.addEventListener(`click`, this.onSelectAnswer);
  }

  onSelectAnswer() {
    throw new Error(`onSelectAnswer is not defined`);
  }
}

export default store.connect((...args) => {
  const view = new Game3(...args);

  view.onSelectAnswer = (event) => {
    const value = event.target.dataset.value;

    if (value) {
      store.dispatch(`resetTimer`);
      store.dispatch(`newAnswer`, {answer: {isCorrect: value === `true`}});
      store.dispatch(`nextStage`);
    }
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
        elements: [Arrow, Timer, Lives]
      }),
      () => render({
        nodeName: `section`,
        id: `game3`,
        className: `game`,
        template: view.template
      })
    ],
    isRerender: args.length !== 0
  });

  return view.element;
}, [`answers`]);
