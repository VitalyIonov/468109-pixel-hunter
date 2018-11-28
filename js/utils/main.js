import {IS_FAST_ANSWER_ELAPSED_TIME, IS_SLOW_ANSWER_ELAPSED_TIME} from "../constants/initialOptions";

export const createElementFromTemplate = (nodeOptions) => {
  const {node, className, elements} = nodeOptions;

  const wrapper = document.createElement(`${node}`);

  if (className !== undefined) {
    wrapper.className = `${className}`;
  }

  wrapper.innerHTML = elements;

  return wrapper;
};

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

  if (elapsedTime < IS_FAST_ANSWER_ELAPSED_TIME) {
    return `fast`;
  }

  if (elapsedTime >= IS_SLOW_ANSWER_ELAPSED_TIME) {
    return `slow`;
  }

  return `correct`;
};
