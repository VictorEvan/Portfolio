import { combineReducers } from 'redux';
import projects from './projects';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  projects,
  loadingBar: loadingBarReducer
});