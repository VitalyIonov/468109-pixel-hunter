import {getElapsedTime, getNextScreen, livesCounter, checkEndGame, getGameResult} from './utils/state';

export const changeScreen = ({store, newScreen}) => {
  let updatedValues = {
    currentScreen: newScreen
  };

  if (newScreen === `game1`) {
    updatedValues = {
      ...updatedValues,
      timerState: `runs`
    };
  }

  if (newScreen === `stats`) {
    updatedValues = {
      ...updatedValues,
    };
  }

  store.setValues(updatedValues);
};

export const changeTimer = ({store}) => {
  const {elapsedTime} = store.getValues([`elapsedTime`]);

  store.setValues({
    elapsedTime: getElapsedTime(elapsedTime)
  });
};

export const resetTimer = ({store}) => {
  store.setValues({
    elapsedTime: 0,
    timerState: `stopped`
  });
};

export const nextStage = ({store}) => {
  const {isEndGame, currentScreen, answers} = store.getValues();

  const newScreen = getNextScreen(isEndGame, currentScreen, answers);

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

  const additionalValues = !isEndGame ? {timerState: `runs`} :
    {
      gameResults: isEndGame ? [...gameResults, getGameResult(newAnswers, newLives)] : gameResults,
      isEndGame
    };

  store.setValues({
    answers: newAnswers,
    lives: newLives,
    ...additionalValues
  });
};
