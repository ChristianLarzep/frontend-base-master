import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { user } from '../pages/App/store/reducers';
import { employees } from '../pages/EmployeesList/store/reducers';

import { modal } from './reducers';
import client from './apolloClient';

const Reducers = combineReducers({
  employees,
  user,
  modal,
  form: formReducer,
  router: routerReducer,
  apollo: client.reducer(),
});

export default Reducers;
