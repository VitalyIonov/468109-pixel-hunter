const questionBlock = (question, type) => {
  const keys = Object.keys(question);

  return keys.map((key) => {
    const {src, answer, imgWidth, imgHeight} = question[key];

    return `
      <div class="game__option">
      <img src=${src} alt="Option 1" data-value=${type === 3 ? answer === `paint` : null} width=${imgWidth || 468} height=${imgHeight || 458}>
      ${type !== 3 ? `<label class="game__answer game__answer--photo">
        <input class="visually-hidden" name=${key} type="radio" value=${answer === `photo`}>
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name=${key} type="radio" value=${answer === `paint`}>
        <span>Рисунок</span>
      </label>` : null}
      </div>
    `;
  }).join(``);
};

export default questionBlock;
