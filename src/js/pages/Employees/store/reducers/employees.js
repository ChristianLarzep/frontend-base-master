import { types } from '../actions/employees';
import img from '../../empty.png';
import { feedQuery } from '../../Employees';

const { ADD_EMPLOYEES, DELETE_EMPLOYEE, GET_EMPLOYEES, ADD_EMPLOYEES_SUCCESS, ADD_EMPLOYEES_FAIL } = types;

const defaultEmployees = {
  success: false,
  loading: false,
  error: null,
};

const defaultState = {};
export const getEmployeesState = (employeeName, state) => state.employees[employeeName] || defaultEmployees;
export default (state = defaultState, action) => {
  const { employeeId, data, employee, error, result } = action;
  const newState = { ...state };

  switch (action.type) {
    case GET_EMPLOYEES:
      Object.assign(newState, {
        ...data,
        getEmployees: true,
      });
      break;
    case ADD_EMPLOYEES:
      Object.assign(newState, {
        employees: [...newState.employees, employee],
      });
      break;

    case DELETE_EMPLOYEE: {
      const newlist = newState.employees.filter(content => content.id !== employeeId);
      Object.assign(newState, {
        employees: [...newlist],
      });
      break;
    }
    case ADD_EMPLOYEES_SUCCESS:
      Object.assign(newState, {
        success: true,
        loading: false,
        error: null,
        data: result.data,
      });
      break;

    case ADD_EMPLOYEES_FAIL:
      Object.assign(newState, {
        loading: false,
        error,
      });
      break;
    default:
      return newState;
  }

  return newState;
};
