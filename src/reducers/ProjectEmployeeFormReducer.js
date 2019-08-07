import { 
    PROJECT_UPDATE,
    PROJECTS_SELECT_FETCH_FAIL,
    PROJECTS_SELECT_FETCH_SS,
    PROJECTS_FETCH_FAIL,
    PROJECTS_FETCH_SS,
    PROJECT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    listSelectOn: true,
    listOn: true,
    projectID: '',
    projectName: '',
    workName: '',
    result: '',
    weight: '',
    score: '',
    assessmentActiveName: '',
    eid: '',
    gitlab_id: '',
    numProject: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case PROJECTS_SELECT_FETCH_FAIL:
            return { ...state, listSelectOn: false };
        case PROJECTS_SELECT_FETCH_SS:
            return { ...state, listSelectOn: true };
        case PROJECTS_FETCH_FAIL:
            return { ...state, listOn: false };
        case PROJECTS_FETCH_SS:
            return { ...state, listOn: true };
        case PROJECT_FAIL:
            return { ...state, error: 'กรุณากรอกทุกช่อง.' };
        default:
            return state;
    }
};
