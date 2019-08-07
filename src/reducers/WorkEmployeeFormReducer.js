import { 
    WORK_UPDATE,
    WORKS_SELECT_FETCH_FAIL,
    WORKS_SELECT_FETCH_SS,
    WORKS_FETCH_FAIL,
    WORKS_FETCH_SS
} from '../actions/types';

const INITIAL_STATE = {
    listSelectOn: true,
    listOn: true,
    name: '',
    uidProject: '',
    nameProject: '',
    assessmentActiveName: '',
    eid: '',
    gitlab_id: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case WORKS_SELECT_FETCH_FAIL:
            return { ...state, listSelectOn: false };
        case WORKS_SELECT_FETCH_SS:
            return { ...state, listSelectOn: true };
        case WORKS_FETCH_FAIL:
            return { ...state, listOn: false };
        case WORKS_FETCH_SS:
            return { ...state, listOn: true };
        default:
            return state;
    }
};
