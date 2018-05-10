import { createStore } from 'redux';

import { types as userTypes } from '../pages/App/store/actions/user';

import reducers from './reducer';
import initialState from './initialState';
import enhancer from './enhancer';

const rootReducer = (state, action) => {
  if (action.type === userTypes.LOGOUT) {
    return reducers({}, action);
  }

  return reducers(state, action);
};

const Store = createStore(rootReducer, initialState, enhancer);

export default Store;
