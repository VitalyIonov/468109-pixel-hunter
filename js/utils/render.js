export const render = (nodeOptions) => {
  const {nodeName, id, className, template, elements, listeners} = nodeOptions;

  let container = document.querySelector(`#${id}`);

  if (Object.prototype.toString.call(container) !== `[object HTMLElement]`) {
    container = document.createElement(`${nodeName}`);

    if (className !== undefined) {
      container.className = `${className}`;
    }

    if (id !== undefined) {
      container.id = `${id}`;
    }
  }

  container.innerHTML = ``;

  if (template !== undefined) {
    container.innerHTML = template;
  }

  if (elements !== undefined) {
    elements.forEach((element) => container.appendChild(element()));
  }

  if (listeners !== undefined) {
    listeners.forEach((listener) => {
      const {targetSelector, type, callback} = listener;

      const targetNode = targetSelector !== undefined ?
        container.querySelector(`${targetSelector}`) :
        container;

      targetNode.addEventListener(`${type}`, callback);
    });
  }

  return container;
};
