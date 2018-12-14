import store from './store';
import {checkStatus} from './utils/main';
import {APP_ID, SERVER_URL} from './constants/main';

export const sendGameResult = (newGameResult, userName) => {
  const requestSettings = {
    body: JSON.stringify(newGameResult),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };

  window.fetch(`${SERVER_URL}/stats/${APP_ID}-${userName}`, requestSettings)
    .then(checkStatus);
};

export const getUserStatistics = () => {
  const {userName} = store.getValues();

  window.fetch(`https://es.dump.academy/pixel-hunter/stats/${APP_ID}-${userName}`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => store.setValues({
      gameResults: data
    }));
};
