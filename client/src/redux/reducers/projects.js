import { RECEIVE_PROJECTS } from '../actions/projects';

export default function projects(state = [], action) {
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return [
        ...state,
        ...action.projects
      ]
    default:
      return state
  }
}