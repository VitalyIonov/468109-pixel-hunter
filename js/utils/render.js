export const render = (nodeOptions) => {
  const {nodeName, id, className, template, elements, isRerender} = nodeOptions;

  let container = document.querySelector(`#${id}`);

  if (Object.prototype.toString.call(container) !== `[object HTMLElement]`) {
    container = document.createElement(`${nodeName}`);

    if (className !== undefined) {
      container.className = `${className}`;
    }

    if (id !== undefined) {
      container.id = `${id}`;
    }

    if (template !== undefined) {
      container.innerHTML = template;
    }

    if (elements !== undefined) {
      elements.forEach((element) => container.appendChild(element()));
    }

    return container;
  }

  if (!isRerender) {
    return container;
  }

  container.innerHTML = ``;

  if (template !== undefined) {
    container.innerHTML = template;
  }

  if (elements !== undefined) {
    elements.forEach((element) => container.appendChild(element()));
  }

  return container;
};
