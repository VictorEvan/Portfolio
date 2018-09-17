import projects from '../data/frontEndProjects';
import repetitiveProjects from '../data/repetitiveProjects';

export default (from, to) => {
  switch(from) {
    case '/contact':
      return {
        classNames: {
          enter: '',
          enterActive: '',
          enterDone: '',
          exit: 'move-out-halves',
          exitActive: 'move-out-halves-active',
          exitDone: ''
        }, timeout: 1250, appear: false
      }
    default:
      break;
  }

  // to switch
  switch(to) {
    case '/contact':
      return {
        classNames: {
          enter: 'move-in-halves',
          enterActive: 'move-in-halves-active',
          enterDone: '',
          exit: '',
          exitActive: '',
          exitDone: ''
        }, timeout: 1000, appear: false
      }
    default:
      break;
  }

  // full from to switch
  if (repetitiveProjects[from] && to === '/projects') from = 'any-project';
  else if (repetitiveProjects[from] && to === '/') from = 'any-project';
  const data = `${from}-${to}`;

  const defaultProjectsCase = {
    classNames: {
      enter: 'expand-chosen-project',
      enterActive: 'expand-chosen-project-active',
      enterDone: 'expand-chosen-project-done',
      exit: 'expand-projects',
      exitActive: 'expand-projects-active',
      exitDone: ''
    },
    timeout: 1500, appear: false
  }
  switch(data) {
    case '/-/projects':
      return {
        classNames: {
          enter: 'slide-up-from-bottom',
          enterActive: 'slide-up-from-bottom-active',
          enterDone: '',
          exit: 'slide-up-from-middle',
          exitActive: 'slide-up-from-middle-active',
          exitDone: 'slide-up-from-middle-done'
        },
        timeout: 500, appear: false
      }
    case '/projects-/':
      return {
        classNames: {
          enter: 'slide-down-from-top',
          enterActive: 'slide-down-from-top-active',
          enterDone: '',
          exit: 'slide-down-from-middle',
          exitActive: 'slide-down-from-middle-active',
          exitDone: 'slide-down-from-middle-done'
        },
        timeout: 500, appear: false
      }
    case `/projects-/projects/${projects[0].title}`:
      return defaultProjectsCase;
    case `/projects-/projects/${projects[1].title}`:
      return defaultProjectsCase;
    case `/projects-/projects/${projects[2].title}`:
      return defaultProjectsCase;
    case `/projects-/projects/${projects[3].title}`:
      return defaultProjectsCase;
    case 'any-project-/projects':
      return {
        classNames: {
          enter: 'slide-down-from-top',
          enterActive: 'slide-down-from-top-active',
          enterDone: '',
          exit: 'slide-down-from-middle',
          exitActive: 'slide-down-from-middle-active',
          exitDone: 'slide-down-from-middle-done'
        },
        timeout: 1500, appear: false
      }
    case 'any-project-/':
      return {
        classNames: {
          enter: 'slide-down-from-top',
          enterActive: 'slide-down-from-top-active',
          enterDone: '',
          exit: 'slide-down-from-middle',
          exitActive: 'slide-down-from-middle-active',
          exitDone: 'slide-down-from-middle-done'
        },
        timeout: 1500, appear: false
      }
    default:
      return {
        classNames: {
          enter: '',
          enterActive: '',
          enterDone: '',
          exit: '',
          exitActive: '',
          exitDone: ''
        },
        timeout: 0, appear: false
      }
  }
};