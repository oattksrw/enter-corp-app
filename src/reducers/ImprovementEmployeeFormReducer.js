import { 
    IMPROVEMENT_UPDATE,
    IMPROVEMENT_CREATE,
    IMPROVEMENT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    activity: '',
    target: '',
    result: '',
    assessmentActiveName: '',
    eid: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IMPROVEMENT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case IMPROVEMENT_CREATE:
            return INITIAL_STATE;
        case IMPROVEMENT_FAIL:
            return { ...state, error: 'กรุณากรอกทุกช่อง.' };
        default:
            return state;
    }
};
