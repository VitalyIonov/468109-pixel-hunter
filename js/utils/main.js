import {Time} from "../constants/initialOptions";
import {QuestionType} from '../constants/main';

export const checkIsAllAnswersAreGiven = (form, answers) => answers.every((answer, index) => {
  const answerId = index + 1;

  return form[`answer${answerId}`].value !== ``;
});

export const checkIsCorrectAnswer = (form, answers) => answers.every((answer, index) => {
  const answerId = index + 1;

  return answer.type === form[`answer${answerId}`].value;
});

export const getMarkModifier = (isCorrect, elapsedTime) => {
  if (!isCorrect) {
    return `wrong`;
  }

  if (elapsedTime < Time.IS_FAST) {
    return `fast`;
  }

  if (elapsedTime >= Time.IS_SLOW) {
    return `slow`;
  }

  return `correct`;
};

export const getGameScreenModifyer = (question) => {
  if (question && question.type === QuestionType.TINDER_LIKE) {
    return `game__content--wide`;
  }

  if (question && question.type === QuestionType.ONE_OF_THREE) {
    return `game__content--tripple`;
  }

  return ``;
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
