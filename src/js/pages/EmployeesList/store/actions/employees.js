import { createTypes, async } from 'redux-action-types';

export const types = createTypes('app/employees/', 'ADD_EMPLOYEES', 'GET_EMPLOYEES');

const employeesActionTypes = [types.ADD_EMPLOYEES_SUCCESS, types.ADD_EMPLOYEES_FAIL];

export const addEmployee = employee => dispatch => dispatch({
  type: types.ADD_EMPLOYEES,
  employee,
});

export const getEmployees = () => dispatch => {
  dispatch({
    type: types.GET_EMPLOYEES,
  });
};

export const addEmployeeSuccess = () => dispatch => {
  dispatch({
    type: types.ADD_EMPLOYEES_SUCCESS,
  });
};

export const addmployeesFail = () => dispatch => {
  dispatch({
    type: types.ADD_EMPLOYEES_FAIL,
  });
};
