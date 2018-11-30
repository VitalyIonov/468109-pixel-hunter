import {render} from '../utils/render';
import store from '../store';
import marks from './marks';

import {
  TRUE_ANSWER_POINTS,
  FAST_ANSWER_POINTS,
  SLOW_ANSWER_POINTS,
  LIVE_POINTS,
} from '../constants/initialOptions';

import Arrow from './arrow';

const Stats = ({gameResults, answers}) => {
  const content = gameResults.map((result, index) => {
    const {correct, fast, slow, livesResult, totalPoints, isWin} = result;

    return `
      <h2 class="result__title">${isWin ? `Победа!` : `Поражение`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
            ${marks(answers)}
          </td>
          <td class="result__points">× ${TRUE_ANSWER_POINTS}</td>
          <td class="result__total">${correct.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${fast.count} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× ${FAST_ANSWER_POINTS}</td>
          <td class="result__total">${fast.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${livesResult.count} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× ${LIVE_POINTS}</td>
          <td class="result__total">${livesResult.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slow.count} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× ${SLOW_ANSWER_POINTS}</td>
          <td class="result__total">${slow.points}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
        </tr>
      </table>
    `;
  }).join(``);

  return render({
    nodeName: `section`,
    id: `app-wrapper`,
    className: `app-wrapper`,
    elements: [
      () => render({
        nodeName: `header`,
        id: `header`,
        className: `header`,
        elements: [Arrow]
      }),
      () => render({
        nodeName: `section`,
        id: `stats`,
        className: `result`,
        template: content
      })
    ],
  });
};

export default store.connect(Stats, [`gameResults`, `answers`]);
