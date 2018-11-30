import store from '../../store';
import {render} from '../../utils/render';
import {ROUND_TIME} from '../../constants/initialOptions';

const Timer = ({elapsedTime, timerId, timerState}) => {
  let interval;

  if (timerState === `runs`) {
    interval = setInterval(() => {
      store.dispatch(`changeTimer`);

    }, 1000);

    store.setValues({
      timerState: `runned`,
      timerId: interval
    });
  }

  if (timerState === `stopped`) {
    clearInterval(timerId);
  }

  if (elapsedTime >= ROUND_TIME) {
    store.dispatch(`resetTimer`);
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

export default store.connect(Timer, [`elapsedTime`, `timerId`, `timerState`]);
