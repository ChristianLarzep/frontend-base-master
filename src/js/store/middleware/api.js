/* eslint-disable no-console */
import { push } from 'react-router-redux';

import { API } from '../../api';

export default ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, types, redirect, ...rest } = action;

  console.log('promise', promise);

  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  return promise(API)
    .then(
      result => {
        next({ ...rest, result, type: SUCCESS });
        if (redirect) dispatch(push(redirect));
        return Promise.resolve();
      },
      error => {
        console.error(error);
        next({ ...rest, error, type: FAILURE });
        return Promise.resolve();
      },
    )
    .catch(error => {
      console.error(error);
      next({ ...rest, error, type: FAILURE });
      return Promise.resolve();
    });
};
