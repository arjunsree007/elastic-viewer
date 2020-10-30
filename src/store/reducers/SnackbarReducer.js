import {SNACKBAR_OPEN, SNACKBAR_CLOSE} from '../actions/SnackbarActions';

const initialState = {
    message: false,
    snackbarType: 'default' 
}

const snackbarReducer = (state=initialState, action) => {
    switch(action.type){
        case SNACKBAR_OPEN:
            return{...state, message: action.payload, snackbarType: action.payloadType}
        case SNACKBAR_CLOSE:
            return{...state, message: action.payload}
        default:
            return state;
    }
}

export default snackbarReducer;