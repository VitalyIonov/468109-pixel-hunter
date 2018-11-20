import {createElementFromTemplate} from '../../utils/main';
import {pubSub} from '../../pubSub';

const template = `
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
`;

const Arrow = createElementFromTemplate({
  node: `button`,
  className: `back`,
  elements: template
});

Arrow.addEventListener(`click`, () => pubSub.publish(`changeScreen`, `greeting`));

export default Arrow;
