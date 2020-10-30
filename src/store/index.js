import {createStore, combineReducers} from 'redux';
import modalReducer from './reducers/ModalReducer';
import snackbarReducer from './reducers/SnackbarReducer';

const rootReducer = combineReducers({
    modal: modalReducer,
    snackbar: snackbarReducer
});

const store = createStore(rootReducer);
export default store;
