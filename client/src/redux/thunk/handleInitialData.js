import { getInitialData } from '../../util/api';
import { receiveProjects } from '../actions/projects'; 
import { showLoading, hideLoading } from 'react-redux-loading';

export default () => {
  return async (dispatch) => {
    dispatch(showLoading());
    const projects = await getInitialData();
    dispatch(receiveProjects(projects));
    dispatch(hideLoading());
  }
};