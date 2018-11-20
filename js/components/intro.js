import {createElementFromTemplate} from '../utils/main';
import {pubSub} from '../pubSub';

const template = `
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
`;

const Intro = createElementFromTemplate({
  node: `section`,
  className: `intro`,
  elements: template
});

const star = Intro.querySelector(`.intro__asterisk`);

star.addEventListener(`click`, () => {
  pubSub.publish(`changeScreen`, `greeting`);
});

export default Intro;
