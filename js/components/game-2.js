import {answersIsGiven, isCorrectAnswer} from '../utils/main';
import {render} from '../utils/render';
import {QUESTIONS} from '../constants/questions';
import store from '../store';
import marks from './marks';
import questionBlock from './question-block';

import AbstractView from '../abstract-view';
import Arrow from './arrow';
import Timer from './timer';
import Lives from './lives';

class Game2 extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get template() {
    const {answers} = this.state;

    const question = QUESTIONS[answers.length];

    return `
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content game__content--wide">
        ${question && questionBlock(question)}
      </form>
      ${marks(answers)}
    `;
  }

  bind(element) {
    const form = element.querySelector(`.game__content`);

    form.addEventListener(`change`, this.onSelectAnswer(form));
  }

  onSelectAnswer() {
    throw new Error(`onSelectAnswer is not defined`);
  }
}

export default store.connect((...args) => {
  const view = new Game2(...args);

  view.onSelectAnswer = (form) => () => {
    if (answersIsGiven(form, [`question1`])) {
      const isCorrect = isCorrectAnswer(form, [`question1`]);

      store.dispatch(`resetTimer`);
      store.dispatch(`newAnswer`, {answer: {isCorrect}});
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
        id: `game2`,
        className: `game`,
        template: view.template
      })
    ],
    isRerender: args.length !== 0
  });

  return view.element;
}, [`answers`]);
