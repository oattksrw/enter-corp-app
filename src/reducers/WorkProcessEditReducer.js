import { 
    WORK_PROCESS_EDIT_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    assessmentActiveName: '',
    eid: '',
    uidProject: '',
    uidWork: '',
    scoreManagerWork: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_PROCESS_EDIT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
