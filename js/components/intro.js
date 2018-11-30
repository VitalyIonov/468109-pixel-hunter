import store from '../store';
import {render} from '../utils/render';

const listeners = [
  {
    targetSelector: `.intro__asterisk`,
    type: `click`,
    callback: () => store.dispatch(`changeScreen`, {newScreen: `greeting`})
  }
];

const Intro = () => {
  const content = `
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  `;

  return render({
    nodeName: `section`,
    id: `intro`,
    className: `intro`,
    template: content,
    listeners
  });
};

export default Intro;
