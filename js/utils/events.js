import {changeScreen} from './render';

export const onAnswer = ({store, answer}) => {
  const {lives, answers} = store.getValues();
  const {isCorrect} = answer;

  store.setValues({
    answers: [...answers, answer],
    lives: isCorrect ? lives : lives - 1
  });
};

export const onEndGame = ({store}) => {
  const {lives} = store.getValues();

  if (lives === 0) {
    changeScreen(`stats`);
  }
};
