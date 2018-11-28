import store from './store';

import {getElapsedTime, getNextScreen, livesCounter, checkEndGame, getGameResult} from './utils/state';

export const changeScreen = ({store, newScreen}) => {
  let updatedValues = {
    currentScreen: newScreen
  };

  if (newScreen === `game1`) {
    updatedValues = {
      ...updatedValues,
      isStartGame: true
    }
  }

  if (newScreen === `stats`) {
    updatedValues = {
      ...updatedValues,
      isStartGame: false
    }
  }

  store.setValues(updatedValues);
};

export const changeTimer = ({store}) => {
  const {elapsedTime} = store.getValues([`elapsedTime`]);

  store.setValues({
    elapsedTime: getElapsedTime(elapsedTime)
  });
};

export const nextStage = ({store}) => {
  const {isEndGame, currentScreen} = store.getValues();

  const newScreen = getNextScreen(isEndGame, currentScreen);

  store.setValues({
    currentScreen: newScreen
  });
};

export const onAnswer = ({store, answer}) => {
  const {lives, answers, elapsedTime, gameResults} = store.getValues();

  const updatedAnswer = {
    ...answer,
    elapsedTime
  };

  const newLives = livesCounter(updatedAnswer, lives);
  const newAnswers = [...answers, updatedAnswer];

  const isEndGame = checkEndGame(newAnswers, newLives);

  const additionalValues = !isEndGame ? {} :
    {
      isTimerStarted: false,
      gameIsStarted: false,
      gameResults: isEndGame ? [...gameResults, getGameResult(newAnswers, newLives)] : gameResults,
      isEndGame
    };

  store.setValues({
    answers: newAnswers,
    lives: newLives,
    elapsedTime: 0,
    ...additionalValues
  });
};
