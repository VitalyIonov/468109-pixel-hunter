import store from '../store';
import marks from './render-marks';
import answersBlock from './answers-block';
import {render} from '../utils/render';

import AbstractView from '../abstract-view';
import Arrow from './arrow';
import Timer from './timer';
import Lives from './lives';

import {QuestionType} from '../constants/game-options';
import {checkIsAllAnswersAreGiven, checkIsCorrectAnswer, getGameScreenModifyer, resizeImage} from '../utils/main';

class Game extends AbstractView {
  constructor(state) {
    super();

    this._state = state;
  }

  get template() {
    const {answers, questions} = this._state;

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

    this.resize(element);

  }

  resize() {
    throw new Error(`resize is not defined`);
  }

  onSelectAnswer() {
    throw new Error(`onSelectAnswer is not defined`);
  }
}

export default store.connect((...args) => {
  const view = new Game(...args);

  view.onSelectAnswer = (form) => (event) => {
    const {answers, type, correctAnswer} = view.question;

    let isAllAnswersAreGiven;
    let isCorrect;

    if (type === QuestionType.ONE_OF_THREE) {
      isAllAnswersAreGiven = !!event.target.dataset.value;
      isCorrect = event.target.dataset.value === correctAnswer;
    } else {
      isAllAnswersAreGiven = checkIsAllAnswersAreGiven(form, answers);
      isCorrect = checkIsCorrectAnswer(form, answers);
    }

    if (isAllAnswersAreGiven) {
      store.dispatch(`resetTimer`);
      store.dispatch(`newAnswer`, {answer: {isCorrect}});
      store.dispatch(`nextStage`);
    }
  };

  view.resize = (element) => {
    const gameOptions = element.querySelectorAll(`.game__option`);

    gameOptions.forEach((gameOption) => {
      const gameOptionImage = gameOption.querySelector(`img`);

      const interval = setInterval(() => {
        if (gameOption.offsetWidth !== 0 && gameOptionImage.offsetWidth !== 0) {
          const gameOptionSize = {
            width: gameOption.clientWidth,
            height: gameOption.clientHeight
          };
          const imageSize = {
            width: gameOptionImage.width,
            height: gameOptionImage.height
          };

          const newImageSize = resizeImage(gameOptionSize, imageSize);

          gameOptionImage.style.setProperty(`width`, `${newImageSize.width}px`);
          gameOptionImage.style.setProperty(`height`, `${newImageSize.height}px`);

          clearInterval(interval);
        }
      }, 50);
    });
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
