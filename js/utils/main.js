export const createElementFromTemplate = (nodeOptions) => {
  const {node, className, elements} = nodeOptions;

  const wrapper = document.createElement(`${node}`);

  if (className !== undefined) {
    wrapper.className = `${className}`;
  }

  wrapper.innerHTML = elements;

  return wrapper;
};

export const validate = (form, fields) => {
  const {elements} = form;

  return fields.every((field) => elements[field].value !== ``);
};
