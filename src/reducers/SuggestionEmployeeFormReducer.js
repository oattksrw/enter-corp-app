import { 
    SUGGESTION_UPDATE,
    SUGGESTION_CREATE,
    SUGGESTION_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    suggestion: '',
    assessmentActiveName: '',
    eid: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUGGESTION_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SUGGESTION_CREATE:
            return INITIAL_STATE;
        case SUGGESTION_FAIL:
            return { ...state, error: 'กรุณากรอกทุกช่อง.' };
        default:
            return state;
    }
};
