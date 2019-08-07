import {
    ASSESSMENT_NAME_CHANGED,
    ASSESSMENT_CREATE_FAIL,
    ASSESSMENT_RESET,
    ASSESSMENT_CREATE,
    ASSESSMENT_CREATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ASSESSMENT_NAME_CHANGED:
            return { ...state, name: action.payload };
        case ASSESSMENT_CREATE:
            return { ...state, loading: true, error: '' };
        case ASSESSMENT_CREATE_SUCCESS:
            return INITIAL_STATE;
        case ASSESSMENT_CREATE_FAIL:
            return { 
                ...state,
                error: 'this field is require between 4 - 20 character and Unique',
                name: '',
                loading: false
            };
        case ASSESSMENT_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
