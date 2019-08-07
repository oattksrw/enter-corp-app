import { 
    PROCESS_PROJECT_UPDATE,
} from '../actions/types';

const INITIAL_STATE = {
    assessmentActiveName: '',
    eid: '',
    uidProject: '',
    uidWork: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESS_PROJECT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
