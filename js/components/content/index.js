import store from '../../store';
import {SCREENS} from '../../constants/main';

import {render} from '../../utils/render';

const content = ({currentScreen}) => render({
  nodeName: `section`,
  id: `screen-wrapper`,
  elements: [SCREENS[currentScreen]]
});

export default store.connect(content, [`currentScreen`]);
