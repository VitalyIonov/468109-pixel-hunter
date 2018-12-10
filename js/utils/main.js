import {Time} from "../constants/initialOptions";

export const answersIsGiven = (form, fields) => {
  const {elements} = form;

  return fields.every((field) => elements[field].value !== ``);
};

export const isCorrectAnswer = (form, fields) => {
  const {elements} = form;

  return fields.every((field) => elements[field].value === `true`);
};

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
