import { createTypes, async } from 'redux-action-types';

export const types = createTypes(
  'user/',
  async('LOGIN'),
  async('LOGOUT'),
  async('GET_SESSION'),
);

export const login = ({ email, password }) => {
  return {
    types: [types.LOGIN, types.LOGIN_SUCCESS, types.LOGIN_FAIL],
    promise: api => api.login({ email, password }),
  };
};

export const logout = () => {
  return {
    types: [types.LOGOUT, types.LOGOUT_SUCCESS, types.LOGOUT_FAIL],
    promise: api => {
      api.logout();
      return Promise.resolve();
    },
    redirect: '/login',
  };
};

export const getUserSession = () => {
  return {
    types: [types.GET_SESSION, types.GET_SESSION_SUCCESS, types.GET_SESSION_FAIL],
    promise: api => api.getUserSession(),
  };
};
