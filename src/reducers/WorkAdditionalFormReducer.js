import { 
    WORK_ADDITIONAL_UPDATE,
    WORK_ADDITIONAL_CREATE,
    WORK_ADDITIONAL_CREATE_FAIL,
    WORK_ADDITIONAL_CREATE_SUCCESS
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
    scoreEmployeeWork: '',
    numWork: '',
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORK_ADDITIONAL_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case WORK_ADDITIONAL_CREATE_SUCCESS:
            return { nameWork: '', resultWork: '', weightWork: '', scoreEmployeeWork: '', error: '', loading: false };
        case WORK_ADDITIONAL_CREATE:
            return { ...state, loading: true };
        case WORK_ADDITIONAL_CREATE_FAIL:
            return { ...state, error: 'กรุณากรอกทุกช่อง.', loading: false };
        default:
            return state;
    }
};
