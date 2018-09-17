const HOME = 'HOME';
const PROJECTS = 'PROJECTS';
const CASESTUDY = 'CASESTUDY';
const DATA = 'DATA';
const CONTACT = 'CONTACT';

const routeNameTranslateConfig = {
  ['/']: HOME,
  ['/projects']: PROJECTS,
  ['/case-study']: CASESTUDY,
  ['/data']: DATA,
  ['/contact']: CONTACT
};

const routeNameTranslator = (pathname) => routeNameTranslateConfig(pathname);

const moveBetweenRoutesConfig = {
  ['/']: {
    up: null,
    right: '/contact',
    down: '/projects',
    left: '/data'
  },
  ['/projects']: {
    up: '/',
    right: null,
    down: null,
    left: null
  },
};

const homeDirections = {
  up: null,
  right: '/contact',
  down: '/projects',
  left: '/data'
};

// where did the movement occur?
const movementLocationHandler = (location, direction) => {
  const { pathname } = location;

  switch(pathname) {
    case '/':
      break;
    case '/projects':
      break;
    case '/contact':
      break;
    case '/case-study':
      break;
  }
};

// TODO: create an agnostic movementHandler
  // it doesn't care whether it's animating between a route or just doing an action.