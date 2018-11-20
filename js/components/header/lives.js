import {createElementFromTemplate} from '../../utils/main';

const template = `
  <img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
  <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
  <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
`;

const Lives = createElementFromTemplate({
  node: `div`,
  className: `game__lives`,
  elements: template
});

export default Lives;
