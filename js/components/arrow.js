import store from '../store';
import {render} from '../utils/render';

const listeners = [
  {
    type: `click`,
    callback: () => {
      store.reset();
      store.dispatch(`changeScreen`, {newScreen: `greeting`});
    }
  }
];

const Arrow = () => {
  const content = `
    <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
  `;

  return render({
    nodeName: `button`,
    id: `button-back`,
    className: `back`,
    template: content,
    listeners
  });
};

export default Arrow;
