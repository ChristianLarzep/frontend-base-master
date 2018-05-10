import { createTypes, async } from 'redux-action-types';

export const types = createTypes(
  'app/modal/',
  'OPEN_MODAL',
  'CLOSE_MODAL',
  'RESET_MODAL',
  async('MODAL_ACTION'),
);

const modalActionTypes = [
  types.MODAL_ACTION,
  types.MODAL_ACTION_SUCCESS,
  types.MODAL_ACTION_FAIL,
];

export const openModal = modalName => dispatch => {
  dispatch({
    type: types.OPEN_MODAL,
    modalName,
  });
};

export const closeModal = modalName => dispatch => {
  dispatch({
    type: types.CLOSE_MODAL,
    modalName,
  });
};

export const resetModal = modalName => dispatch => {
  dispatch({
    type: types.RESET_MODAL,
    modalName,
  });
};

export const sendWithdraw = ({ amount }) => {
  return {
    types: modalActionTypes,
    promise: api => api.investorWithdraw({ amount: parseFloat(amount) }),
    amount: parseFloat(amount),
    modalName: 'sendWithdraw',
  };
};

export const sendDeposit = data => {
  const { amount, date, file } = data;

  return {
    types: modalActionTypes,
    promise: api =>
      api.investorDeposit({
        amount: parseFloat(amount),
        date: date.format('YYYY-MM-DD'),
        file,
      }),
    modalName: 'sendDeposit',
  };
};
/* eslint-disable */
export const changePassword = ({
  actual_password,
  new_password,
  confirmation_password,
}) => {
  return {
    types: modalActionTypes,
    promise: api =>
      api.changePassword({
        actual_password,
        new_password,
        confirmation_password,
      }),
    modalName: 'changePassword',
  };
};

export const proposeCompany = ({
  business_name,
  type,
  contact_name,
  position,
  email,
  phone,
}) => {
  return {
    types: modalActionTypes,
    promise: api =>
      api.proposeCompany({
        business_name,
        type,
        contact_name,
        position,
        email,
        phone,
      }),
    modalName: 'proposeCompany',
  };
};
