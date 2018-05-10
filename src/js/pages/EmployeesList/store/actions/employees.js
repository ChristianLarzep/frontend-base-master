import { createTypes, async } from 'redux-action-types';

export const types = createTypes('app/employees/', async('ADD_EMPLOYEES'), 'GET_EMPLOYEES', async('DELETE_EMPLOYEE'));

const employeesActionTypes = [types.ADD_EMPLOYEES_SUCCESS, types.ADD_EMPLOYEES_FAIL];

export const addEmployee = employee => {
  console.log(employee);
  return {
    types: [types.ADD_EMPLOYEES, types.ADD_EMPLOYEES_SUCCESS, types.ADD_EMPLOYEES_FAIL],
    promise: () => Promise.resolve(employee),
    employee,
  };
};

export const deleteEmployee = employeeId => dispatch => {
  dispatch({
    type: types.DELETE_EMPLOYEE,
    employeeId,
  });
};

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
