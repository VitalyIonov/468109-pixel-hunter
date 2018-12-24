import {Time} from "../constants/initial-options";
import {QuestionType} from '../constants/game-options';

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

  if (elapsedTime < Time.FAST) {
    return `fast`;
  }

  if (elapsedTime > Time.SLOW) {
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
  }

  throw new Error(`${response.status}: ${response.statusText}`);
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
    if (question.type === QuestionType.ONE_OF_THREE) {
      return Object.assign(question, {
        correctAnswer: getCorrectAnswer(question.answers)
      });
    }

    return question;
  });
};

export const resizeImage = (frameSize, imageSize) => {
  const widthRatio = imageSize.width / frameSize.width;
  const heightRatio = imageSize.height / frameSize.height;

  if (widthRatio <= 1 && heightRatio <= 1) {
    return imageSize;
  }

  if (widthRatio > 1 && heightRatio <= 1) {
    return {
      width: imageSize.width / widthRatio,
      height: imageSize.height / widthRatio
    };
  }

  if (widthRatio <= 1 && heightRatio > 1) {
    return {
      width: imageSize.width / heightRatio,
      height: imageSize.height / heightRatio
    };
  }

  const maxRatio = Math.max(widthRatio, heightRatio);

  return {
    width: imageSize.width / maxRatio,
    height: imageSize.height / maxRatio
  };
};
