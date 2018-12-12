import store from '../store';
import marks from './marks';
import answersBlock from './answers-block';
import {render} from '../utils/render';

import AbstractView from '../abstract-view';
import Arrow from './arrow';
import Timer from './timer';
import Lives from './lives';

import {QuestionType, AnswerType} from '../constants/main';
import {checkIsAllAnswersAreGiven, checkIsCorrectAnswer, getGameScreenModifyer} from '../utils/main';

class Game extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get template() {
    const {answers, questions} = this.state;

    this.question = questions[answers.length];

    const gameScreenModifyer = getGameScreenModifyer(this.question);

    return `
      <p class="game__task">${this.question && this.question.question}</p>
      <form class="game__content ${gameScreenModifyer}">
        ${this.question && answersBlock(this.question)}
      </form>
       ${marks(answers)}
    `;
  }

  bind(element) {
    const form = element.querySelector(`.game__content`);

    if (this.question && this.question.type !== QuestionType.ONE_OF_THREE) {
      form.addEventListener(`change`, this.onSelectAnswer(form));
    }

    if (this.question && this.question.type === QuestionType.ONE_OF_THREE) {
      form.addEventListener(`click`, this.onSelectAnswer(form));
    }
  }

  onSelectAnswer() {
    throw new Error(`onSelectAnswer is not defined`);
  }
}

export default store.connect((...args) => {
  const view = new Game(...args);

  view.onSelectAnswer = (form) => (event) => {
    const {question, answers, type} = view.question;

    let isAllAnswersAreGiven;
    let isCorrect;

    if (type === QuestionType.ONE_OF_THREE) {
      isAllAnswersAreGiven = !!event.target.dataset.value;

      if (question === `Найдите фото среди изображений`) {
        isCorrect = event.target.dataset.value === AnswerType.PHOTO;
      }

      if (question === `Найдите рисунок среди изображений`) {
        isCorrect = event.target.dataset.value === AnswerType.PAINTING;
      }
    }

    if (type !== QuestionType.ONE_OF_THREE) {
      isAllAnswersAreGiven = checkIsAllAnswersAreGiven(form, answers);
      isCorrect = checkIsCorrectAnswer(form, answers);
    }

    if (isAllAnswersAreGiven) {
      store.dispatch(`newAnswer`, {answer: {isCorrect}});
      store.dispatch(`resetTimer`);
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
        id: `game1`,
        className: `game`,
        template: view.template
      })
    ],
    isRerender: args.length !== 0
  });

  return view.element;
}, [`answers`, `questions`]);
