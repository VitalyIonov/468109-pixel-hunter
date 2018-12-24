import {QuestionType, AnswerType} from '../constants/game-options';

const answersBlock = (question) => {
  const {answers, type} = question;

  return answers.map((answer, index) => {
    const {image, type: answerType} = answer;
    const {url} = image;

    const answerId = index + 1;

    return `
      <div class="game__option">
      <img src=${url} alt="Option ${answerId}" data-value=${answerType}>
      ${type !== QuestionType.ONE_OF_THREE ? `<label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="answer${answerId}" type="radio" value=${AnswerType.PHOTO}>
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="answer${answerId}" type="radio" value=${AnswerType.PAINTING}>
        <span>Рисунок</span>
      </label>` : null}
      </div>
    `;
  }).join(``);
};

export default answersBlock;
