import {render} from '../utils/render';
import store from '../store';
import marks from './render-marks';

import {Points} from '../constants/initial-options';

import AbstractView from '../abstract-view';
import Arrow from './arrow';

class Stats extends AbstractView {
  constructor(state) {
    super();

    this._state = state;
  }

  get template() {
    const {gameResults} = this._state;

    return gameResults.map((result, index) => {
      const {correct, fast, slow, livesResult, totalPoints, isWin, answers} = result;

      return `
      <h2 class="result__title">${isWin ? `Победа!` : `Поражение`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
            ${marks(answers)}
          </td>
          ${isWin ? `<td class="result__points">× ${Points.TRUE}</td>
          <td class="result__total">${correct.points}</td>` : `<td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>`}
        </tr>
        ${isWin ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${fast.count} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× ${Points.FAST}</td>
          <td class="result__total">${fast.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${livesResult.count} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× ${Points.LIVE}</td>
          <td class="result__total">${livesResult.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slow.count} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× ${Points.SLOW}</td>
          <td class="result__total">${slow.points}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
        </tr>` : ``}
      </table>
    `;
    }).join(``);
  }
}

export default store.connect((...args) => {
  const view = new Stats(...args);

  view.render({
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
        template: view.template
      })
    ],
    isRerender: false
  });

  return view.element;
}, [`gameResults`]);
