import store from '../store';
import {SCREENS, HEADER} from '../constants/main';

export const changeScreen = (screenName) => {
  store.setValues({currentScreen: screenName});

  renderHeader(screenName);
  renderScreen(screenName, `#screen`);
};

export const renderScreen = (screenName, containerSelector) => {
  const container = document.querySelector(`${containerSelector}`);

  const {component, className} = SCREENS[screenName];

  container.className = `${className}`;
  container.innerHTML = ``;
  container.appendChild(component);
};

export const renderHeader = (screenName) => {
  const headerElements = HEADER.map((element) => {
    const {component, thereIsInSections} = element;

    return {
      component,
      available: thereIsInSections.indexOf(screenName) !== -1
    };
  });

  let header = document.querySelector(`.header`);

  if (header === null) {
    header = document.createElement(`header`);
    header.className = `header`;

    let isHeader;

    headerElements.forEach((element) => {
      const {component, available} = element;

      if (available) {
        isHeader = true;

        header.appendChild(component);
      }
    });

    if (isHeader) {
      const mainContainer = document.querySelector(`#main`);

      const firstChild = mainContainer.firstChild;

      mainContainer.insertBefore(header, firstChild);
    }
  }

  if (Object.prototype.toString.call(header) === `[object HTMLElement]`) {
    headerElements.forEach((element) => {
      const {component, available} = element;

      if (header.contains(component) && !available) {
        header.removeChild(component);

        return;
      }

      if (!header.contains(component) && available) {
        header.appendChild(component);
      }
    });
  }
};
