import {QuestionType} from '../constants/main';

const answersBlock = (question) => {
  const {answers, type} = question;

  return answers.map((answer, index) => {
    const {image, type: answerType} = answer;
    const {url, width, height} = image;

    const answerId = index + 1;

    return `
      <div class="game__option">
      <img src=${url} alt="Option ${answerId}" data-value=${answerType} width=${width} height=${height}>
      ${type !== QuestionType.ONE_OF_THREE ? `<label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="answer${answerId}" type="radio" value=${answerType}>
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="answer${answerId}" type="radio" value=${answerType}>
        <span>Рисунок</span>
      </label>` : null}
      </div>
    `;
  }).join(``);
};

export default answersBlock;
