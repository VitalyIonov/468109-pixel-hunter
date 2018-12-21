import {getElapsedTime, getNextScreen, livesCounter, checkEndGame, getGameResult} from './utils/state';
import {sendGameResult} from './sources';

export const changeScreen = ({store, newScreen}) => {
  let updatedValues = {
    currentScreen: newScreen
  };

  if (newScreen === `game`) {
    updatedValues = Object.assign(updatedValues, {
      timerState: `runs`
    });
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
  const {lives, answers, elapsedTime, gameResults, userName} = store.getValues();

  const updatedAnswer = Object.assign(answer, {
    elapsedTime
  });

  const newLives = livesCounter(updatedAnswer, lives);
  const newAnswers = [...answers, updatedAnswer];

  const isEndGame = checkEndGame(newAnswers, newLives);
  let newGameResult;

  if (isEndGame) {
    newGameResult = getGameResult(newAnswers, newLives);

    sendGameResult(newGameResult, userName);
  }

  const additionalValues = !isEndGame ? {timerState: `runs`} :
    {
      gameResults: [...gameResults, newGameResult],
      isEndGame
    };

  store.setValues(Object.assign({
    answers: newAnswers,
    lives: newLives,
    elapsedTime: 0,
  }, additionalValues));
};
