import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    OPINION_UPDATE,
    OPINION_CREATE,
    OPINION_FAIL
} from './types';

export const opinionUpdate = ({ prop, value }) => {
    return {
        type: OPINION_UPDATE,
        payload: { prop, value }
    };
};

export const opinionCreate = ({ 
    self, team, manager, office, person, suggestion, assessmentActiveName, eid
}) => {
    const opinionData = { self, team, manager, office, person, suggestion };
    return (dispatch) => {
        opinionCreateRepo(opinionData, dispatch, assessmentActiveName, eid);
    };
};

const opinionCreateRepo = async(opinionData, dispatch, assessmentActiveName, eid) => {
    const validateSelf = await validateSelfRepo(opinionData, dispatch);
    const validateTeam = await validateTeamRepo(opinionData, dispatch);
    const validateManager = await validateManagerRepo(opinionData, dispatch);
    const validateOffice = await validateOfficeRepo(opinionData, dispatch);
    const validatePerson = await validatePersonRepo(opinionData, dispatch);
    const validateSuggestion = await validateSuggestionRepo(opinionData, dispatch);
    if (validateSelf && validateTeam && validateManager && validateOffice && validatePerson && validateSuggestion) {
        firebase.database()
        .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment`)
            .update({
                opinion: {
                    self: opinionData.self,
                    team: opinionData.team,
                    manager: opinionData.manager,
                    office: opinionData.office,
                    person: opinionData.person
                },
                suggestion: opinionData.suggestion
            }).then(() => {
                dispatch({ type: OPINION_CREATE });
                Actions.assessmentEmployeePage({ type: 'reset' });
            });
    }
};

const validateSelfRepo = async(opinionData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof opinionData.self === validate.type 
        && opinionData.self.length >= validate.min_value
        && opinionData.self.length <= validate.max_value
    ) {
        return true;
    }
    validateOpinionFail(dispatch);
    return false;
};

const validateTeamRepo = async(opinionData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof opinionData.team === validate.type 
        && opinionData.team.length >= validate.min_value
        && opinionData.team.length <= validate.max_value
    ) {
        return true;
    }
    validateOpinionFail(dispatch);
    return false;
};

const validateManagerRepo = async(opinionData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof opinionData.manager === validate.type 
        && opinionData.manager.length >= validate.min_value
        && opinionData.manager.length <= validate.max_value
    ) {
        return true;
    }
    validateOpinionFail(dispatch);
    return false;
};

const validateOfficeRepo = async(opinionData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof opinionData.office === validate.type 
        && opinionData.office.length >= validate.min_value
        && opinionData.office.length <= validate.max_value
    ) {
        return true;
    }
    validateOpinionFail(dispatch);
    return false;
};

const validatePersonRepo = async(opinionData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof opinionData.person === validate.type 
        && opinionData.person.length >= validate.min_value
        && opinionData.person.length <= validate.max_value
    ) {
        return true;
    }
    validateOpinionFail(dispatch);
    return false;
};

const validateSuggestionRepo = async(opinionData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof opinionData.suggestion === validate.type 
        && opinionData.suggestion.length >= validate.min_value
        && opinionData.suggestion.length <= validate.max_value
    ) {
        return true;
    }
    validateOpinionFail(dispatch);
    return false;
};


const validateOpinionFail = (dispatch) => {
    dispatch({ type: OPINION_FAIL });
};
