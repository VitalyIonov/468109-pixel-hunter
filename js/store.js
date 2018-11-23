import {pubSub} from './pubSub';

let values = {
  currentScreen: `intro`,
  answers: [],
  lastAnswer: {
    isCorrect: false,
    elapsedTime: 30
  },
  lives: 1,
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
