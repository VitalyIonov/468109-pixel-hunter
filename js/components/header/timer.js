import {createElementFromTemplate} from '../../utils/main';

const template = `
  NN
`;

const Timer = createElementFromTemplate({
  node: `div`,
  className: `game__timer`,
  elements: template
});

export default Timer;
