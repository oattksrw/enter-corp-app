import { 
    EMPLOYEE_UPDATE,
    EMPLOYEE_RESET,
    EMPLOYEE_CREATE,
    REGISTER_USER_FAIL,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_DELETE_SUCCESS,
    ID_EMPLOYEE_FAIL,
    NAME_EMPLOYEE_FAIL,
    DEPARTMENT_EMPLOYEE_FAIL,
    EMPLOYEE_LOADING,
    EMPLOYEE_SAVE_LOADING,
    EMPLOYEE_DELETE_LOADING,
    GITLABID_EMPLOYEE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    eid: '',
    name: '',
    department: '',
    gitlab_id: '',
    gen: '',
    address: '',
    email: '',
    tell: '',
    username: '',
    password: '',
    error: ' ',
    id_error: ' ',
    name_error: ' ',
    department_error: ' ',
    gitlab_id_error: ' ',
    loading: false,
    saveLoading: false,
    deleteLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_USER_FAIL:
            return { ...state, error: 'Failed.' };
        case EMPLOYEE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case EMPLOYEE_RESET:
            return INITIAL_STATE;
        case EMPLOYEE_CREATE:
            return INITIAL_STATE;
        case EMPLOYEE_SAVE_SUCCESS:
            return INITIAL_STATE;
        case EMPLOYEE_DELETE_SUCCESS:
            return INITIAL_STATE;
        case ID_EMPLOYEE_FAIL:
            return { ...state, id_error: 'this field is require 6 character and unique', loading: false };
        case NAME_EMPLOYEE_FAIL:
            return { ...state, name_error: 'this field is require between 6 - 20 character', loading: false };
        case DEPARTMENT_EMPLOYEE_FAIL:
            return { ...state, department_error: 'this field is require', loading: false };
        case GITLABID_EMPLOYEE_FAIL:
            return { ...state, gitlab_id_error: 'this field is unique', loading: false };
        case EMPLOYEE_LOADING:
            return { ...state, loading: true, error: '' };
        case EMPLOYEE_SAVE_LOADING:
            return { ...state, saveLoading: true, error: '' };
        case EMPLOYEE_DELETE_LOADING:
            return { ...state, deleteLoading: true, error: '' };
        default:
            return state;
    }
};
