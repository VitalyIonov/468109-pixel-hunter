let values = {
  screensCount: 0,
  currentScreen: 0
};

export const store = {
  setValues(newValues) {
    values = {
      ...values,
      ...newValues
    };
  },

  getValues(key) {
    return key ? values[key] : values;
  }
};
