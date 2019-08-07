import { 
    PROCESS_ASSESSMENT_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    assessmentActiveName: '',
    eid: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESS_ASSESSMENT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
