import store from '../store';
import {Time} from '../constants/initialOptions';

import AbstractView from '../abstract-view';

class Timer extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get template() {
    const {elapsedTime} = this.state;

    return `
      ${Time.ROUND - elapsedTime}
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

      return;
    }

    if (Time.ROUND - elapsedTime <= 5) {
      view.element.classList.add(`game__timer--blink`);
    }

    if (elapsedTime >= Time.ROUND) {
      view.element.classList.remove(`game__timer--blink`);

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
