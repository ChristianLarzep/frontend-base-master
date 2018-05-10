import { types } from '../actions/modal';

const {
  OPEN_MODAL,
  CLOSE_MODAL,
  RESET_MODAL,
  MODAL_ACTION,
  MODAL_ACTION_SUCCESS,
  MODAL_ACTION_FAIL,
} = types;

const defaultModal = {
  showModal: false,
  success: false,
  loading: false,
  error: null,
};

const defaultState = {
};

export const getModalState = (modalName, state) => state.modal[modalName] || defaultModal;

export default (state = defaultState, action) => {
  const { modalName, error, result } = action;
  const newState = { ...state };

  switch (action.type) {
    case OPEN_MODAL:
      Object.assign(newState, {
        [modalName]: {
          ...defaultModal,
          ...newState[modalName],
          showModal: true,
        },
      });
      break;
    case CLOSE_MODAL:
      Object.assign(newState, {
        [modalName]: {
          ...defaultModal,
        },
      });
      break;
    case RESET_MODAL:
      Object.assign(newState, {
        [modalName]: {
          ...newState[modalName],
          showModal: true,
          success: false,
          loading: false,
          error: null,
        },
      });
      break;
    case MODAL_ACTION:
      Object.assign(newState, {
        [modalName]: {
          ...newState[modalName],
          loading: true,
          error: null,
        },
      });
      break;
    case MODAL_ACTION_SUCCESS:
      Object.assign(newState, {
        [modalName]: {
          ...newState[modalName],
          success: true,
          loading: false,
          error: null,
          data: result.data,
        },
      });
      break;
    case MODAL_ACTION_FAIL:
      Object.assign(newState, {
        [modalName]: {
          ...newState[modalName],
          loading: false,
          error,
        },
      });
      break;
    default:
      return newState;
  }

  return newState;
};
