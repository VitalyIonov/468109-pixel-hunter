import {getScreen} from '../utils/main';
import {store} from '../store';

const arrows = document.createElement(`div`);
arrows.innerHTML = `
<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn arrows__btn--prev"><-</button>
  <button class="arrows__btn arrows__btn--next">-></button>
</div>
`;

const prevButton = arrows.querySelector(`.arrows__btn--prev`);
const nextButton = arrows.querySelector(`.arrows__btn--next`);

prevButton.addEventListener(`click`, () => {
  const {currentScreen} = store.getValues();

  getScreen(currentScreen - 1);
});

nextButton.addEventListener(`click`, () => {
  const {currentScreen} = store.getValues();

  getScreen(currentScreen + 1);
});

export default arrows;
