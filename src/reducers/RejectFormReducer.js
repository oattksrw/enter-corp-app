import { 
    REJECT_UPDATE,
    REJECT_CREATE
} from '../actions/types';

const INITIAL_STATE = {
    rejectMessage: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REJECT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case REJECT_CREATE:
            return INITIAL_STATE;
        // case EMPLOYEE_SAVE_SUCCESS:
        //     return INITIAL_STATE;
        // case ID_EMPLOYEE_FAIL:
        //     return { ...state, id_error: 'this field is require 6 character and unique', loading: false };
        // case NAME_EMPLOYEE_FAIL:
        //     return { ...state, name_error: 'this field is require between 8 - 20 character', loading: false };
        // case DEPARTMENT_EMPLOYEE_FAIL:
        //     return { ...state, department_error: 'this field is require', loading: false };
        // case EMPLOYEE_LOADING:
        //     return { ...state, loading: true, error: '' };
        // case EMPLOYEE_SAVE_LOADING:
        //     return { ...state, saveLoading: true, error: '' };
        // case EMPLOYEE_DELETE_LOADING:
        //     return { ...state, deleteLoading: true, error: '' };
        default:
            return state;
    }
};
