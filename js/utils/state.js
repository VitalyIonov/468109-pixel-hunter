import {
  TRUE_ANSWER_POINTS,
  FAST_ANSWER_POINTS,
  SLOW_ANSWER_POINTS,
  LIVE_POINTS,
  IS_FAST_ANSWER_ELAPSED_TIME,
  IS_SLOW_ANSWER_ELAPSED_TIME,
  LIVE_COUNT
} from '../constants/initialOptions';

export const pointsCounter = (answers = [], lives) => {
  if (
    Array.isArray(answers) &&
    answers.length === 10 &&
    lives > 0 &&
    lives <= LIVE_COUNT
  ) {
    const pointsFromAnswers = answers.reduce((result, answer) => {
      const {isCorrect, elapsedTime} = answer;

      let points = 0;

      if (isCorrect) {
        points += TRUE_ANSWER_POINTS;
      }

      if (elapsedTime < IS_FAST_ANSWER_ELAPSED_TIME) {
        points += FAST_ANSWER_POINTS;
      }

      if (elapsedTime >= IS_SLOW_ANSWER_ELAPSED_TIME) {
        points += SLOW_ANSWER_POINTS;
      }

      return result + points;
    }, 0);

    const pointsFromLives = lives * LIVE_POINTS;

    return pointsFromAnswers + pointsFromLives;
  }

  return 0;
};
