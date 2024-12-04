import './css/normalize.css';
import './css/style.css';
import * as domManager from './js/domUtils';
import headerRenderer from './js/headerRenderer';
import { init } from './js/init';
            
function component() {
  return init();
}

domManager.appendChildElements(document.body, headerRenderer(),  component());
// document.body.appendChild(component());