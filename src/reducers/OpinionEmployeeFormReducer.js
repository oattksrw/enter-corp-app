import { 
    OPINION_UPDATE,
    OPINION_CREATE,
    OPINION_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    self: '',
    team: '',
    manager: '',
    office: '',
    person: '',
    assessmentActiveName: '',
    eid: '',
    suggestion: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPINION_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case OPINION_CREATE:
            return INITIAL_STATE;
        case OPINION_FAIL:
            return { ...state, error: 'กรุณากรอกทุกช่อง.' };
        default:
            return state;
    }
};
