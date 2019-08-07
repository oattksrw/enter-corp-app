import { 
    DEPARTMENT_UPDATE,
    DEPARTMENT_RESET,
    DEPARTMENT_CREATE,
    NAME_DEPARTMENT_FAIL,
    DEPARTMENT_SAVE_SUCCESS,
    DEPARTMENT_LOADING,
    DEPARTMENT_SAVE_LOADING,
    DEPARTMENT_DELETE_LOADING
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    monStatus: '',
    monStart: '',
    monEnd: '',
    tueStatus: '',
    tueStart: '',
    tueEnd: '',
    wedStatus: '',
    wedStart: '',
    wedEnd: '',
    thuStatus: '',
    thuStart: '',
    thuEnd: '',
    friStatus: '',
    friStart: '',
    friEnd: '',
    satStatus: '',
    satStart: '',
    satEnd: '',
    sunStatus: '',
    sunStart: '',
    sunEnd: '',
    loading: false,
    saveLoading: false,
    deleteLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DEPARTMENT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case DEPARTMENT_RESET:
            return INITIAL_STATE;
        case DEPARTMENT_CREATE:
            return INITIAL_STATE;
        case NAME_DEPARTMENT_FAIL:
            return { 
                ...state, 
                name_error: 'this field is require between 4-20 character and unique' 
            };
        case DEPARTMENT_SAVE_SUCCESS:
            return INITIAL_STATE;
        case DEPARTMENT_LOADING:
            return { ...state, loading: true, error: '' };
        case DEPARTMENT_SAVE_LOADING:
            return { ...state, saveLoading: true, error: '' };
        case DEPARTMENT_DELETE_LOADING:
            return { ...state, deleteLoading: true, error: '' };
        default:
            return state;
    }
};
