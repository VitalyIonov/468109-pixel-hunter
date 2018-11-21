let values = {
  currentScreen: `intro`
};

const store = {
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

export default store;
