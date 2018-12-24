import {Points, LIVE_COUNT, Time} from '../constants/initial-options';

const updateGameResult = (result, answer) => {
  const {isCorrect, elapsedTime} = answer;
  const updateResult = result;

  if (isCorrect) {
    updateResult.correct.count += 1;
    updateResult.correct.points += Points.TRUE;
  }

  if (isCorrect && elapsedTime < Time.FAST) {
    updateResult.fast.count += 1;
    updateResult.fast.points += Points.FAST;
  }

  if (isCorrect && elapsedTime >= Time.SLOW) {
    updateResult.slow.count += 1;
    updateResult.slow.points += Points.SLOW;
  }

  return updateResult;
};

export const getGameResult = (answers, lives) => {
  const resultFromAnswers = answers.reduce((result, answer) => updateGameResult(result, answer), {
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

  return Object.assign(resultFromAnswers, resultFromLives, {
    totalPoints: correct.points + fast.points + slow.points + livesResult.points,
    isWin: answers.length === 10 && lives >= 0,
    answers
  });
};

export const livesCounter = (lastAnswer, lives) => {
  const updatedLives = lives > LIVE_COUNT ? LIVE_COUNT : lives;
  const {isCorrect} = lastAnswer;

  if (updatedLives >= 0 && isCorrect) {
    return updatedLives;
  }

  if (updatedLives >= 0 && !isCorrect) {
    return updatedLives - 1;
  }

  return -1;
};

export const getNextScreen = (isEndGame, currentScreen, answers) => {
  if (isEndGame || answers.length >= 10) {
    return `stats`;
  }

  return currentScreen;
};

export const checkEndGame = (answers, lives) => lives < 0 || answers.length >= 10;

export const getElapsedTime = (elapsedTime) => {
  if (elapsedTime >= Time.ROUND) {
    return Time.ROUND;
  }

  if (elapsedTime < 0) {
    return 0;
  }

  return elapsedTime + 1;
};
