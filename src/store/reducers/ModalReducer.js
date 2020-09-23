import { MODAL_OPEN, MODAL_CLOSE } from "../actions/ModalActions";

const initialState = {
  modalToggle: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return { ...state, modalToggle: action.payload };
    case MODAL_CLOSE:
      return { ...state, modalToggle: action.payload };
    default:
      return state;
  }
};

export default modalReducer;
