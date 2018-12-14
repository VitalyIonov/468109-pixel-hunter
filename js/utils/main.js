import {Time} from "../constants/initialOptions";
import {QuestionTypes} from '../constants/main';

export const checkIsAllAnswersAreGiven = (form, answers) => answers.every((answer, index) => {
  const answerId = index + 1;

  return form.elements[`answer${answerId}`].value !== ``;
});

export const checkIsCorrectAnswer = (form, answers) => answers.every((answer, index) => {
  const answerId = index + 1;

  return answer.type === form.elements[`answer${answerId}`].value;
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
  if (question && question.type === QuestionTypes.TINDER_LIKE) {
    return `game__content--wide`;
  }

  if (question && question.type === QuestionTypes.ONE_OF_THREE) {
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

const getCorrectAnswer = (answers) => {
  const answerChoices = new Set();
  const duplicateAnswerChoices = new Set();

  answers.forEach((answer) => {
    if (!answerChoices.has(answer.type)) {
      answerChoices.add(answer.type);
    } else {
      duplicateAnswerChoices.add(answer.type);
    }
  });

  duplicateAnswerChoices.forEach((duplicateChoice) => answerChoices.delete(duplicateChoice));

  return Array.from(answerChoices).toString();
};

export const formatQuestionsToClient = (questions) => {
  return questions.map((question) => {
    if (question.type === QuestionTypes.ONE_OF_THREE) {
      return {
        ...question,
        correctAnswer: getCorrectAnswer(question.answers)
      };
    }

    return question;
  });
};
