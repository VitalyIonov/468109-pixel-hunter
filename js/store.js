import { ROUND_TIME } from './constants/initialOptions';

export const initialValues = {
  currentScreen: `intro`,
  answers: [],
  lives: 3,
  elapsedTime: 0,
  remainedTime: ROUND_TIME,
  isTimerStarted: false,
  isEndGame: false,
  isStartGame: false,
  nameIsEntered: false,
  gameResults: []
};

let values = {};

const store = {
  connected: [],
  channels: [],

  setValues(newValues) {
    values = {
      ...values,
      ...newValues
    };

    const keys = Object.keys(newValues);

    let reRenderComponents = new Set();

    keys.forEach((key) => {
      if (this.connected[key]) {
        this.connected[key].forEach((component) => reRenderComponents.add(component));
      }
    });

    reRenderComponents.forEach((component) => component(this.getValues()));
  },

  getValues(keys) {
    return keys ?
      keys.reduce((result, key) => {
        if (values[key] !== undefined) {
          return {
            ...result,
            [key]: values[key]
          }
        }

        return result;
      }, {}) :
      values;
  },

  initialize(values) {
    this.setValues(values)
  },

  reset() {
    this.setValues(initialValues)
  },

  bindAction(channelName, action) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }

    this.channels[channelName].push(action);
  },

  dispatch(channelName, data) {
    const channel = this.channels[channelName];

    if (!channel || !channel.length) {
      return;
    }

    channel.forEach((listener) => listener({store: this, ...data}));
  },

  connect(component, keys) {
    keys.forEach((key) => {
      if (!this.connected[key]) {
        this.connected[key] = new Set();
      }

      this.connected[key].add(component);
    });

    return () => component(this.getValues(keys));
  }
};

export default store;
