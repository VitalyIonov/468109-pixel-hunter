import {SCREENS} from "./constants/main";

const container = document.querySelector(`#main`);
const screens = SCREENS.map((screenName) => document.querySelector(`#${screenName}`));

console.log('container', container);
console.log('screens', screens);
