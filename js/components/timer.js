import store from '../store';
import {TIME} from '../constants/initialOptions';

import AbstractView from '../abstract-view';

class Timer extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get template() {
    const {elapsedTime} = this.state;

    return `
      ${TIME.ROUND - elapsedTime}
    `;
  }

  render(nodeOptions) {
    super.render(nodeOptions);

    const {elapsedTime, timerState, timerId} = this.state;

    this.onTimerStep(elapsedTime, timerState, timerId);
  }

  onTimerStep() {
    throw new Error(`onTimerStep is not defined`);
  }
}

export default store.connect((...args) => {
  const view = new Timer(...args);

  view.onTimerStep = (elapsedTime, timerState, timerId) => {
    if (timerState === `runs`) {
      const interval = setInterval(() => {
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

    if (elapsedTime >= TIME.ROUND) {
      store.dispatch(`resetTimer`);
      store.dispatch(`newAnswer`, {answer: {isCorrect: false}});
      store.dispatch(`nextStage`);
    }
  };

  view.render({
    nodeName: `section`,
    id: `timer`,
    className: `game__timer`,
    template: view.template,
    isRerender: args.length !== 0
  });

  return view.element;
}, [`elapsedTime`, `timerId`, `timerState`]);
