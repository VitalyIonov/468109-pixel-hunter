import {Time} from './constants/initialOptions';

export const initialValues = {
  userName: ``,
  currentScreen: `splash`,
  answers: [],
  lives: 3,
  elapsedTime: 0,
  remainedTime: Time.ROUND,
  timerState: `stopped`,
  isEndGame: false,
  nameIsEntered: false,
  gameResults: [],
  questions: [],
  error: ``
};

let values = {};

const store = {
  connected: [],
  channels: [],

  setValues(newValues) {
    values = Object.assign(values, newValues);

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
          return Object.assign(result, {
            [key]: values[key]
          });
        }

        return result;
      }, {}) :
      values;
  },

  initialize(data) {
    this.setValues(data);
  },

  reset(initialData) {
    if (initialData) {
      this.setValues(initialData);
    } else {
      this.setValues(initialValues);
    }
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

    channel.forEach((listener) => listener(Object.assign({
      store: this
    }, data)));
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
