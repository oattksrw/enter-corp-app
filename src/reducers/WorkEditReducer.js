import { 
    WORK_EDIT_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    assessmentActiveName: '',
    eid: '',
    uidProject: '',
    nameProject: '',
    uidWork: '',
    nameWork: '',
    resultWork: '',
    weightWork: '',
    scoreEmployeeWork: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_EDIT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
