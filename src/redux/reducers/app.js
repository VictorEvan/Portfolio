import * as AppActionTypes from '../actiontypes/app';

export const initialAppState = {
  test: 'test value'
}

export function AppReducer(state=initialAppState, action) {
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