import { types } from '../actions/user';

const loadingStates = [
  types.LOGIN,
  types.LOGOUT,
];

const failureStates = [
  types.LOGIN_FAIL,
  types.LOGOUT_FAIL,
];

const defaultState = {
  name: 'demo',
};

const {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} = types;

export default (state = defaultState, action) => {
  const { error, result } = action;
  const newState = {
    ...state,
    loading: false,
    error: null,
  };

  if (loadingStates.indexOf(action.type) >= 0) {
    return {
      ...state,
      user: {},
      loading: true,
      error: null,
    };
  }

  if (failureStates.indexOf(action.type) >= 0) {
    return {
      ...state,
      loading: false,
      error,
    };
  }

  switch (action.type) {
    case LOGIN_SUCCESS:
      Object.assign(newState, { ...result.data });
      break;
    case LOGOUT_SUCCESS:
      Object.assign(newState, defaultState);
      break;
    default:
      Object.assign(newState, state);
  }

  return newState;
};
