import * as domManager from './domUtils';
import * as iconManager from './icons'

function toggleButton() {
  const div = domManager.createDivElement(
    ['skywatch-header__toggle-button'],
  );

  const divCelcius = domManager.createDivElement(
    ['skywatch-header__toggle-button__celcius'],
    {innerHTML: '&#8451;'}
  );

  const divFerhanite = domManager.createDivElement(
    ['skywatch-header__toggle-button__ferhanite'],
    {innerHTML: '&#8457;'}
  );
  const label = domManager.createlabelElement(
    ['toggle-button__switch'],
  );

  const input = domManager.createInputElement(
    ['toggle-button__switch__input'],
    {},
    {type: 'checkbox'}
  );

  const span = domManager.createSpanElement(
    ['toggle-button__switch__slider', 'toggle-button__switch__round']
  );

  domManager.appendChildElements(
    label,
    input,
    span
  );

  domManager.appendChildElements(
    div,
    divCelcius,
    label,
    divFerhanite
  );
  return div;
}

function textLogo() {
  const divWrapper = domManager.createDivElement(
    ['skywatch-header__logo-wrapper']
  );

  const logo = domManager.createDivElement(
    ['logo-wrapper__icon'],
    {innerHTML: iconManager.dayNightIcon()}
  );

  const headerText = domManager.createH1Element(
    ['skywatch-header__text'],
    {innerText: 'Sky Watch'}
  );

  domManager.appendChildElements(
    divWrapper,
    logo,
    headerText
  );
  return divWrapper;
}

export default function headerRenderer() {
  const header = domManager.createHeaderElement(
    ['skywatch-header'],
    {},
    {}
  );

  domManager.appendChildElements(
    header,
    textLogo(),
    toggleButton()
  );

  return header;
}