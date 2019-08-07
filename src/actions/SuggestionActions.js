import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    SUGGESTION_UPDATE,
    SUGGESTION_CREATE,
    SUGGESTION_FAIL
} from './types';

export const suggestionUpdate = ({ prop, value }) => {
    return {
        type: SUGGESTION_UPDATE,
        payload: { prop, value }
    };
};

export const suggestionCreate = ({ suggestion, assessmentActiveName, eid }) => {
    const suggestionData = { suggestion };
    return (dispatch) => {
        suggestionCreateRepo(suggestionData, dispatch, assessmentActiveName, eid);
    };
};

const suggestionCreateRepo = async(suggestionData, dispatch, assessmentActiveName, eid) => {
    const validateSuggestion = await validateSuggestionRepo(suggestionData, dispatch);
    if (validateSuggestion) {
        firebase.database()
        .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment`)
        .update({
            suggestion: suggestionData.suggestion,
        }).then(() => {
            dispatch({ type: SUGGESTION_CREATE });
            Actions.assessmentEmployeePage({ type: 'reset' });
        });
    }
};

const validateSuggestionRepo = async(suggestionData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 100,
        require: true,
        duplicate: true
    };
    if (typeof suggestionData.suggestion === validate.type 
        && suggestionData.suggestion.length >= validate.min_value
        && suggestionData.suggestion.length <= validate.max_value
    ) {
        return true;
    }
    validateSuggestionFail(dispatch);
    return false;
};

const validateSuggestionFail = (dispatch) => {
    dispatch({ type: SUGGESTION_FAIL });
};
