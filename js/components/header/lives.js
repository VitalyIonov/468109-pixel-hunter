import store from '../../store';
import {render} from '../../utils/render';
import {LIVE_COUNT} from '../../constants/initialOptions';

const Lives = ({lives}) => {
  const content = `
    ${new Array(LIVE_COUNT - lives)
    .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
    .join(` `)}
    ${new Array(lives)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(` `)}
  `;

  return render({
    nodeName: `section`,
    id: `lives`,
    className: `game__lives`,
    template: content
  });
};

export default store.connect(Lives, [`lives`]);
