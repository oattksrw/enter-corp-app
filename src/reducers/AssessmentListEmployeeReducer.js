import { 
    ASSESSMENT_LIST_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    projectChecked: false,
    improvementChecked: false,
    opinionChecked: false,
    suggestionChecked: false,
    assessmentActiveName: '',
    eid: '',
    loading: false,
    error: '',
    status: false,
    comment: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ASSESSMENT_LIST_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
