import { 
    WORK_CREATE_SELECT_UPDATE,
    WORK_CREATE_SELECT,
    WORK_CREATE_SELECT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    gitlab_id: '',
    assessmentActiveName: '',
    eid: '',
    uidProject: '',
    nameProject: '',
    nameWork: '',
    resultWork: '',
    weightWork: '',
    scoreEmployeeWork: '',
    numWork: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_CREATE_SELECT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case WORK_CREATE_SELECT_SUCCESS:
            return { ...state, loading: false };
        case WORK_CREATE_SELECT:
            return { ...state, loading: true };
        default:
            return state;
    }
};
