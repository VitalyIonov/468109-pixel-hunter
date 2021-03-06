import {Points, LIVE_COUNT, Time} from '../constants/initialOptions';

export const getGameResult = (answers, lives) => {
  const resultFromAnswers = answers.reduce((result, answer) => {
    const {isCorrect, elapsedTime} = answer;

    let newResult = result;

    if (isCorrect) {
      newResult.correct.count += 1;
      newResult.correct.points += Points.TRUE;
    }

    if (isCorrect && elapsedTime < Time.IS_FAST) {
      newResult.fast.count += 1;
      newResult.fast.points += Points.FAST;
    }

    if (isCorrect && elapsedTime >= Time.IS_SLOW) {
      newResult.slow.count += 1;
      newResult.slow.points += Points.SLOW;
    }

    return newResult;
  }, {
    correct: {
      count: 0,
      points: 0
    },
    fast: {
      count: 0,
      points: 0
    },
    slow: {
      count: 0,
      points: 0
    }
  });

  const resultFromLives = {
    livesResult: {
      count: lives <= 0 ? 0 : lives,
      points: lives <= 0 ? 0 : lives * Points.LIVE
    }
  };

  const {correct, fast, slow} = resultFromAnswers;
  const {livesResult} = resultFromLives;

  return {
    ...resultFromAnswers,
    ...resultFromLives,
    totalPoints: correct.points + fast.points + slow.points + livesResult.points,
    isWin: answers.length === 10 && lives >= 0,
    answers
  };
};

export const livesCounter = (lastAnswer, lives) => {
  if (typeof lastAnswer === `object` && lastAnswer.isCorrect !== undefined && typeof lives === `number`) {
    const updatedLives = lives > LIVE_COUNT ? LIVE_COUNT : lives;
    const {isCorrect} = lastAnswer;

    if (updatedLives >= 0 && isCorrect) {
      return updatedLives;
    }

    if (updatedLives >= 0 && !isCorrect) {
      return updatedLives - 1;
    }

    return -1;
  }

  return -1;
};

export const getNextScreen = (isEndGame, currentScreen, answers) => {
  if ((typeof isEndGame === `boolean` && isEndGame) || answers.length >= 10) {
    return `stats`;
  }

  if (typeof isEndGame !== `boolean` || typeof currentScreen !== `string`) {
    return `greeting`;
  }

  return currentScreen;
};

export const checkEndGame = (answers, lives) => {
  if (typeof lives === `number` || Array.isArray(answers)) {
    return lives < 0 || answers.length >= 10;
  }

  return false;
};

export const getElapsedTime = (elapsedTime) => {
  if (typeof elapsedTime === `number`) {
    if (elapsedTime >= Time.ROUND) {
      return Time.ROUND;
    }

    if (elapsedTime < 0) {
      return 0;
    }

    return elapsedTime + 1;
  }

  return 0;
};
