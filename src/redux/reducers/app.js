import * as AppActionTypes from '../actiontypes/app';

const initialState = {
  test: 'test value'
}

export default function App(state=initialState, action) {
  switch(action.type) {
    case AppActionTypes.TEST_ACTION: {
      return {
        ...state,
        test: 'success'
      }
    }
    default:
      return state;
  }
}