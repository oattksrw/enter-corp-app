import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    IMPROVEMENT_UPDATE,
    IMPROVEMENT_CREATE,
    IMPROVEMENT_FAIL
} from './types';

export const improvementUpdate = ({ prop, value }) => {
    return {
        type: IMPROVEMENT_UPDATE,
        payload: { prop, value }
    };
};

export const improvementCreate = ({ activity, target, result, assessmentActiveName, eid }) => {
    const improvementData = { activity, target, result };
    return (dispatch) => {
        improvementCreateRepo(improvementData, dispatch, assessmentActiveName, eid);
    };
};

const improvementCreateRepo = async(improvementData, dispatch, assessmentActiveName, eid) => {
    const validateActivity = await validateActivityRepo(improvementData, dispatch);
    const validateTarget = await validateTargetRepo(improvementData, dispatch);
    const validateResult = await validateResultRepo(improvementData, dispatch);
    if (validateActivity && validateTarget && validateResult) {
        firebase.database()
            .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment/improvement`)
            .update({
                activity: improvementData.activity,
                target: improvementData.target,
                result: improvementData.result
            }).then(() => {
                dispatch({ type: IMPROVEMENT_CREATE });
                Actions.assessmentEmployeePage({ type: 'reset' });
            });
    }
};

const validateActivityRepo = async(improvementData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof improvementData.activity === validate.type 
        && improvementData.activity.length >= validate.min_value
        && improvementData.activity.length <= validate.max_value
    ) {
        return true;
    }
    validateImprovementFail(dispatch);
    return false;
};

const validateTargetRepo = async(improvementData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof improvementData.target === validate.type 
        && improvementData.target.length >= validate.min_value
        && improvementData.target.length <= validate.max_value
    ) {
        return true;
    }
    validateImprovementFail(dispatch);
    return false;
};

const validateResultRepo = async(improvementData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof improvementData.result === validate.type 
        && improvementData.result.length >= validate.min_value
        && improvementData.result.length <= validate.max_value
    ) {
        return true;
    }
    validateImprovementFail(dispatch);
    return false;
};

const validateImprovementFail = (dispatch) => {
    dispatch({ type: IMPROVEMENT_FAIL });
};
