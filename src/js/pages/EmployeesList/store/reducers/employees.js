import { types } from '../actions/employees';
import img from '../../empty.png';

const { ADD_EMPLOYEES, DELETE_EMPLOYEE, GET_EMPLOYEES, ADD_EMPLOYEES_SUCCESS, ADD_EMPLOYEES_FAIL } = types;

const defaultEmployees = {
  success: false,
  loading: false,
  error: null,
};

const defaultState = {
  employees: [
    {
      key: 1,
      id: 1,
      name: 'Roberto Diaz',
      position: 'Cajero',
      imagen: img,
    },
    { key: 7, id: 7 },
    {
      key: 2,
      id: 2,
      name: 'Carlos Hernandez',
      position: 'CEO',
      imagen: img,
      phone: '23234545',
      email: 'carlos@hotmail.com',
    },
    {
      key: 3,
      id: 3,
      name: 'Karla Martinez',
      position: 'Recepcionista',
      imagen: img,
      phone: '23456567',
      email: 'karla@hotmail.com',
    },
    {
      key: 4,
      id: 4,
      name: 'Maria Lopez',
      position: 'Cajera',
      imagen: img,
      phone: '76787654',
      email: 'maria@live.com',
    },
    {
      key: 5,
      id: 5,
      name: 'Marlon Jerome',
      position: 'Gerente',
      imagen: img,
      phone: '23435465',
      email: 'marlon@live.com',
    },
  ],
};
export const getEmployeesState = (employeeName, state) => state.employees[employeeName] || defaultEmployees;
export default (state = defaultState, action) => {
  const { employeeId, employee, error, result } = action;
  const newState = { ...state };

  switch (action.type) {
    case GET_EMPLOYEES:
      Object.assign(newState, {
        ...defaultEmployees,
        getEmployees: true,
      });
      break;
    case ADD_EMPLOYEES:
      Object.assign(newState, {
        employees: [...newState.employees, employee],
      });
      break;

    case DELETE_EMPLOYEE: {
      const arr = newState.employees.filter(content => content.id !== employeeId);
      console.log(employeeId, arr);
      Object.assign(newState, {
        employees: [...arr],
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
