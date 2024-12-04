function createElement(tagName, classNames, attributes = {}, content = {}) {
  const element = document.createElement(tagName);

  if(typeof classNames !== 'undefined') {    
    element.classList.add(...classNames);
  }

  // for (const [key, value] of Object.entries(attributes)) {
  //   element.setAttribute(key, value);
  // }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  const has = Object.prototype.hasOwnProperty;  
  if(has.call(content, 'innerHTML') && has.call(content, 'innerText')) {
    const { innerHTML, innerText } = content;
    element.innerHTML = innerHTML;
    element.innerText = innerText;
  } else if(has.call(content, 'innerHTML')) {
    const { innerHTML } = content;
    element.innerHTML = innerHTML;
  } else if(has.call(content, 'innerText'))  {
    const { innerText } = content;
    element.innerText = innerText;
  }

  return element;
}

function appendChildElements(parentElement, ...childElements) {
  childElements.forEach((childElement) => {
    parentElement.appendChild(childElement);
  });
}

function prependElements(parentElement, ...childElements) {
  childElements.forEach((childElement) => {
    parentElement.prepend(childElement);
  });
}

function setInnerHTML(selector, html) {
  const element = selector;
  element.innerHTML = html;
}

function setInnerText(selector, html) {
  const element = selector;
  element.innerText = html;
}

function setClass(element, ...classNames) {
  classNames.forEach((className) =>{
    element.classList.add(className);
  });
}

function setDataAttribute(element, dataAttribute) {
  element.setAttribute(dataAttribute.data, dataAttribute.value);
}

function createlabelElement(classNames, content, attributes = {}) {
  return createElement('label', classNames, attributes, content);
}

function createHeaderElement(classNames, content, attributes = {}) {
  return createElement('header', classNames, attributes, content);
}

function createAsideElement(classNames, content, attributes = {}) {
  return createElement('aside', classNames, attributes, content);
}

function createTimeElement(classNames, content, attributes = {}) {
  return createElement('time', classNames, attributes, content);
}

function createUlElement(classNames, content, attributes = {}) {
  return createElement('ul', classNames, attributes, content);

}

function createLiElement(classNames, content, attributes = {}) {
  return createElement('li', classNames, attributes, content);

}

function createSpanElement(classNames, content, attributes = {}) {
  return createElement('span', classNames, attributes, content);
}

function createButtonElement(classNames, content, attributes = {}) {
  return createElement('button', classNames, attributes, content);
};

function createDivElement(classNames, content, attributes = {}) {
  return createElement('div', classNames, attributes, content);
};

function createPElement(classNames, content, attributes = {}){
  return createElement('div', classNames, attributes, content);
}

function createSectionElement(classNames, content, attributes = {}) {
  return createElement('section', classNames, attributes, content);
}

function createH1Element(classNames, content, attributes = {}) {
  return createElement('h1', classNames, attributes, content);
}

function createH3Element(classNames, content, attributes = {}) {
  return createElement('h3', classNames, attributes, content);
}

function createInputElement(classNames, content, attributes = {}) {
  return createElement('input', classNames, attributes, content);
}

function createSelectElement(classNames, content, attributes = {}) {
  return createElement('select', classNames, attributes, content);
}

function createOptionElement(classNames, content, attributes = {}) {
  return createElement('option', classNames, attributes, content);
}

function createTextareaElement(classNames, content, attributes = {}) {
  return createElement('textarea', classNames, attributes, content);
}

export  { 
  createUlElement,
  createLiElement,
  createSpanElement,
  createButtonElement,
  createDivElement,
  appendChildElements,
  prependElements,
  setInnerHTML,
  setInnerText,
  setClass,
  setDataAttribute,
  createPElement,
  createSectionElement,
  createH1Element,
  createH3Element,
  createInputElement,
  createSelectElement,
  createOptionElement,
  createTextareaElement,
  createHeaderElement,
  createAsideElement,
  createTimeElement,
  createlabelElement
}