import store from '../../store';
import {HEADER} from '../../constants/main';

import {render} from '../../utils/render';

const Header = ({currentScreen}) => {
  const elements = HEADER.reduce((result, element) => {
    const {component, thereIsInSections} = element;

    if (thereIsInSections.indexOf(currentScreen) !== -1) {
      return [...result, component];
    }

    return result;
  }, []);

  return render({
    nodeName: `header`,
    id: `main-header`,
    className: `header`,
    elements
  });
};

export default store.connect(Header, [`currentScreen`]);
