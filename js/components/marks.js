import {getMarkModifier} from "../utils/main";

const marks = (answers) => {
  return `
  <ul class="stats">
  ${answers.map((answer) => {
    const {isCorrect, elapsedTime} = answer;

    return `<li class="stats__result stats__result--${getMarkModifier(isCorrect, elapsedTime)}"></li>`;
  }).join(``)}
  ${new Array(10 - answers.length)
    .fill(`<li class="stats__result stats__result--unknown"></li>`)
    .join(``)}
  </ul>
  `;
};

export default marks;
