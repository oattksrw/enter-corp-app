import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    WORK_UPDATE,
    WORKS_SELECT_FETCH_SUCCESS,
    WORK_CREATE_SELECT_UPDATE,
    WORKS_FETCH_SUCCESS,
    // WORKS_SELECT_FETCH_FAIL,
    // WORKS_SELECT_FETCH_SS,
    WORKS_FETCH_FAIL,
    WORKS_FETCH_SS,
    WORK_EDIT_UPDATE,
    WORK_ADDITIONAL_UPDATE,
    WORKS_ADDITIONAL_FETCH_SUCCESS,
    WORKS_PROCESS_FETCH_SUCCESS,
    WORK_PROCESS_EDIT_UPDATE,
    WORK_CREATE_SELECT,
    WORK_CREATE_SELECT_SUCCESS,
    WORK_ADDITIONAL_CREATE_FAIL,
    WORK_ADDITIONAL_CREATE_SUCCESS,
    WORK_ADDITIONAL_CREATE
} from './types';

export const workUpdate = ({ prop, value }) => {
    return {
        type: WORK_UPDATE,
        payload: { prop, value }
    };
};

export const workCreateSelectUpdate = ({ prop, value }) => {
    return {
        type: WORK_CREATE_SELECT_UPDATE,
        payload: { prop, value }
    };
};

export const workEditUpdate = ({ prop, value }) => {
    return {
        type: WORK_EDIT_UPDATE,
        payload: { prop, value }
    };
};

export const workAdditionalUpdate = ({ prop, value }) => {
    return {
        type: WORK_ADDITIONAL_UPDATE,
        payload: { prop, value }
    };
};

export const worksAdditionalFetch = ({ assessmentActiveName, eid, uidProject }) => {
    const ref = `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/git/${uidProject}/works/additional`;
    return (dispatch) => {
        const workRef = firebase.database().ref(`${ref}`);
        workRef.on('value', snapshot => {
            dispatch({ type: WORKS_ADDITIONAL_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const worksSelectFetch = ({ gitlabID, nameProject }) => {
    const ref = `/gitlab_id/${gitlabID}/projects/${nameProject}/works`;
    console.log({ gitlabID, nameProject });
    return (dispatch) => {
        const workRef = firebase.database().ref(`${ref}`);
        workRef.orderByChild('status').equalTo('has not been used').on('value', snapshot => {
            if (snapshot.val() === null) {
                // dispatch({ type: WORKS_SELECT_FETCH_FAIL });
            } else {
                // dispatch({ type: WORKS_SELECT_FETCH_SS });
            }
            dispatch({ type: WORKS_SELECT_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const worksFetch = ({ assessmentActiveName, eid, uidProject }) => {
    const ref = `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/${uidProject}/works`;
    return (dispatch) => {
        const workRef = firebase.database().ref(`${ref}`);
        workRef.on('value', snapshot => {
            if (snapshot.val() === null) {
                dispatch({ type: WORKS_FETCH_FAIL });
            } else {
                dispatch({ type: WORKS_FETCH_SS });
            }
            dispatch({ type: WORKS_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const workCreateSelectCreate = ({ 
    gitlabID,
    assessmentActiveName,
    eid,
    uidProject,
    nameProject,
    nameWork,
    resultWork,
    weightWork,
    scoreEmployeeWork,
    numWork
}) => {
    const ref = firebase.database().ref(
        `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/${uidProject}/works/${numWork}`
    );
   
    return (dispatch) => {
        dispatch({ type: WORK_CREATE_SELECT });
        ref.update({ 
            name: nameWork,
            result: resultWork,
            weight: weightWork,
            score_of_employee: scoreEmployeeWork,
            score_of_manager: scoreEmployeeWork
        })
            .then(() => {
                const projectRef = 
                firebase.database().ref(`/gitlab_id/${gitlabID}/projects/${nameProject}/works/${nameWork}`);
                projectRef.update({
                    status: 'used'
                })
                .then(() => {
                    dispatch({ type: WORK_CREATE_SELECT_SUCCESS });
                    Actions.assessmentWorkEmployeePage({ type: 'reset' });
                });
            });
    };
};

export const workAdditionalCreate = ({
    assessmentActiveName,
    eid,
    uidProject,
    nameWork,
    resultWork,
    weightWork,
    scoreEmployeeWork,
    numWork
}) => {
    const workData = {
        assessmentActiveName,
        eid,
        uidProject,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork,
        numWork
    };
    return (dispatch) => {
        dispatch({ type: WORK_ADDITIONAL_CREATE });
        workAdditionalCreateRepo(workData, dispatch, assessmentActiveName, eid);
    };
};

const workAdditionalCreateRepo = async(workData, dispatch, assessmentActiveName, eid) => {
    const validateNameWork = await validateNameWorkRepo(workData, dispatch);
    const validateResultWork = await validateResultWorkRepo(workData, dispatch);
    if (validateNameWork && validateResultWork) {
        const ref = firebase.database().ref(
            `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/${workData.uidProject}/works/${workData.numWork}`
        );
        ref.update({ 
            name: workData.nameWork,
            result: workData.resultWork,
            weight: workData.weightWork,
            score_of_employee: workData.scoreEmployeeWork,
            score_of_manager: workData.scoreEmployeeWork
        }).then(() => {
            dispatch({ type: WORK_ADDITIONAL_CREATE_SUCCESS });
            Actions.assessmentWorkEmployeePage({ type: 'reset' });
        });
    }
};

const validateNameWorkRepo = async(workData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof workData.nameWork === validate.type 
        && workData.nameWork.length >= validate.min_value
        && workData.nameWork.length <= validate.max_value
    ) {
        return true;
    }
    validateWorkFail(dispatch);
    return false;
};

const validateResultWorkRepo = async(workData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof workData.resultWork === validate.type 
        && workData.resultWork.length >= validate.min_value
        && workData.resultWork.length <= validate.max_value
    ) {
        return true;
    }
    validateWorkFail(dispatch);
    return false;
};

const validateWorkFail = (dispatch) => {
    dispatch({ type: WORK_ADDITIONAL_CREATE_FAIL });
};

export const workEditSave = ({ 
    assessmentActiveName,
    eid,
    uidProject,
    uidWork,
    resultWork,
    weightWork,
    scoreEmployeeWork
}) => {
    const ref = firebase.database().ref(
        `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/${uidProject}/works/${uidWork}`
    );
   
    return () => {
        ref.update({
            result: resultWork,
            weight: weightWork,
            score_of_employee: scoreEmployeeWork,
            score_of_manager: scoreEmployeeWork
        })
            .then(() => {
                Actions.assessmentWorkEmployeePage({ type: 'reset' });
            });
    };
};

export const workProcessFetch = ({ works }) => {
    return (dispatch) => {
        dispatch({ type: WORKS_PROCESS_FETCH_SUCCESS, payload: works });
    };
};

export const workProcessEditUpdate = ({ prop, value }) => {
    return {
        type: WORK_PROCESS_EDIT_UPDATE,
        payload: { prop, value }
    };
};


export const workProcessEditCreate = ({ 
    assessmentActiveName,
    eid,
    uidProject,
    uidWork,
    scoreManagerWork
}) => {
    const ref = firebase.database().ref(
        `/assessments/${assessmentActiveName}/process/${eid}/assessment/projects/${uidProject}/works/${uidWork}`
    );
   
    return () => {
        ref.update({
            score_of_manager: scoreManagerWork
        });
    };
};
