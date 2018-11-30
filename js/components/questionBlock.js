const questionBlock = (question, keys) => {
  return keys.map((key) => {
    const {src, answer} = question[key];

    return `
      <div class="game__option">
      <img src=${src} alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name=${key} type="radio" value=${answer === `photo`}>
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name=${key} type="radio" value=${answer === `paint`}>
        <span>Рисунок</span>
      </label>
      </div>
    `;
  }).join(``);
};

export default questionBlock;
