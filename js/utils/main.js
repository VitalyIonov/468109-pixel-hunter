import {SCREENS} from "../constants/main";
import {store} from '../store';

const container = document.querySelector(`#main`);
const screens = SCREENS.map((screenName) => document.querySelector(`#${screenName}`).innerHTML);

store.setValues({
  screensCount: screens.length
});

export const render = (screenNumber) => {
  container.innerHTML = screens[screenNumber];
};

export const getScreen = (screenNumber) => {
  const {screensCount} = store.getValues();

  if (screenNumber >= screensCount) {
    const nextScreen = 0;

    store.setValues({
      currentScreen: nextScreen
    });

    return render(nextScreen);
  }

  if (screenNumber < 0) {
    const nextScreen = screensCount - 1;

    store.setValues({
      currentScreen: nextScreen
    });

    return render(nextScreen);
  }

  store.setValues({
    currentScreen: screenNumber
  });

  return render(screenNumber);
};
