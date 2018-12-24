import store from './store';
import {checkStatus, formatQuestionsToClient} from './utils/main';
import {APP_ID, SERVER_URL} from './constants/game-options';

export const getQuestions = async () => {
  try {
    const response = await fetch(`https://es.dump.academy/pixel-hunter/questions`);
    const checkedResponse = await checkStatus(response);
    const responseData = await checkedResponse.json();

    store.setValues({
      questions: formatQuestionsToClient(responseData)
    });

    store.dispatch(`changeScreen`, {newScreen: `greeting`});
  } catch (error) {
    store.setValues({
      error
    });

    store.dispatch(`changeScreen`, {newScreen: `error`});
  }
};

export const sendGameResult = async (newGameResult, userName) => {
  const requestSettings = {
    body: JSON.stringify(newGameResult),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };

  const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${userName}`, requestSettings);

  checkStatus(response);
};

export const getUserStatistics = async () => {
  const {userName} = store.getValues();

  const response = await fetch(`https://es.dump.academy/pixel-hunter/stats/${APP_ID}-${userName}`);

  if (response.ok) {
    const responseData = await response.json();

    store.setValues({
      gameResults: responseData
    });
  }
};
