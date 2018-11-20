const container = document.querySelector(`#main`);

export const render = (element) => {
  container.innerHTML = ``;
  container.appendChild(element);
};

const getElement = (nodeOptions) => {
  const {node, className, elements} = nodeOptions;

  const wrapper = document.createElement(`${node}`);

  if (className !== undefined) {
    wrapper.className = `${className}`;
  }

  if (typeof elements === `string`) {
    wrapper.innerHTML = elements;
  }

  if (Array.isArray(elements)) {
    elements.forEach((element) => {
      const {elem, listeners} = element;
      const clone = elem.cloneNode(true);

      if (listeners !== undefined && typeof listeners === `object`) {
        const events = Object.keys(listeners);

        events.forEach((event) => {
          clone.addEventListener(`${event}`, listeners[event]);
        });
      }

      wrapper.appendChild(clone);
    });
  }

  return wrapper;
};

export const createElementFromTemplate = (nodesOptions) => {
  if (typeof nodesOptions === `object` && !Array.isArray(nodesOptions)) {
    return getElement(nodesOptions);
  }

  const wrapper = document.createElement(`div`);

  nodesOptions.forEach((nodeOptions) => {
    const element = getElement(nodeOptions);

    wrapper.appendChild(element);
  });

  return wrapper;
};

export const validate = (form, fields) => {
  const {elements} = form;

  return fields.every((field) => elements[field].value !== ``);
};
