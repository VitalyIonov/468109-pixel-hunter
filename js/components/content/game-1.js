import {answersIsGiven, isCorrectAnswer} from '../../utils/main';
import {render} from '../../utils/render';
import {QUESTIONS} from '../../constants/questions';
import store from '../../store';
import marks from './marks';
import questionBlock from './questionBlock';

const listeners = [
  {
    targetSelector: `.game__content`,
    type: `change`,
    callback: () => {
      const form = document.querySelector(`.game__content`);

      if (answersIsGiven(form, [`question1`, `question2`])) {
        const isCorrect = isCorrectAnswer(form, [`question1`, `question2`]);

        store.dispatch(`resetTimer`);
        store.dispatch(`newAnswer`, {answer: {isCorrect}});
        store.dispatch(`nextStage`);
        store.dispatch(`nextStage`);
      }
    }
  }
];

const Game1 = ({answers, isEndGame}) => {
  if (isEndGame) {
    return null;
  }

  const question = QUESTIONS[answers.length];

  const keys = Object.keys(question);

  const content = `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${questionBlock(question, keys)}
    </form>
     ${marks(answers)}
  `;

  return render({
    nodeName: `section`,
    id: `game1`,
    className: `game`,
    template: content,
    listeners
  });
};

export default store.connect(Game1, [`answers`, `isEndGame`]);
