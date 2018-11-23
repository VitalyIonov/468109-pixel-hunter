import {pubSub} from './pubSub';
import { ROUND_TIME } from './constants/initialOptions';

let values = {
  currentScreen: `intro`,
  answers: [],
  lives: 1,
  elapsedTime: 0,
  remainedTime: ROUND_TIME,
  isEndGame: false
};

const store = {
  setValues(newValues) {
    values = {
      ...values,
      ...newValues
    };
  },

  getValues(keys) {
    return keys ?
      keys.reduce((result, key) => {
        if (values[key]) {
          return {
            ...result,
            [key]: values[key]
          }
        }

        return result;
      }, {}) :
      values;
  },

  dispatch(type, data) {
    pubSub.publish(type, {store: this, ...data});
  }
};

export default store;
