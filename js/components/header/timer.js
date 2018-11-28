import store from '../../store';
import {render} from '../../utils/render';
import {ROUND_TIME} from '../../constants/initialOptions';

const Timer = ({elapsedTime, isStartGame, isTimerStarted}) => {
  if (isStartGame && !isTimerStarted) {
    const interval = setInterval(() => {
      store.dispatch(`changeTimer`);

      const {isEndGame, isStartGame: newIsStartGame} = store.getValues();

      if (isEndGame || !newIsStartGame) {
        clearInterval(interval);
      }
    }, 1000);

    store.setValues({
      isTimerStarted: true
    });
  }

  if (elapsedTime >= ROUND_TIME) {
    store.dispatch(`newAnswer`, {answer: {isCorrect: false}});
    store.dispatch(`nextStage`);
  }

  const content = `
    ${ROUND_TIME - elapsedTime}
  `;

  return render({
    nodeName: `section`,
    id: `timer`,
    className: `game__timer`,
    template: content
  });
};

export default store.connect(Timer, [`elapsedTime`, `isStartGame`, `isTimerStarted`]);
