import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import { 
    ASSESSMENT_NAME_CHANGED,
    ASSESSMENT_CREATE_FAIL,
    ASSESSMENT_RESET,
    ASSESSMENT_LIST_UPDATE,
    ASSESSMENT_PROCESS_FETCH_SUCCESS,
    PROCESS_ASSESSMENT_UPDATE,
    REJECT_UPDATE,
    REJECT_CREATE,
    ASSESSMENT_CREATE,
    ASSESSMENT_CREATE_SUCCESS
} from './types';

export const assessmentListUpdate = ({ prop, value }) => {
    return {
        type: ASSESSMENT_LIST_UPDATE,
        payload: { prop, value }
    };
};

export const rejectUpdate = ({ prop, value }) => {
    return {
        type: REJECT_UPDATE,
        payload: { prop, value }
    };
};

export const rejectCreate = ({ rejectMessage, assessmentActiveName, eid }) => {
    let action1 = 'enable';
    let action2 = 'enable';
    let action3 = 'enable';

    return (dispatch) => {
        const ref1 = firebase.database().ref(`/assessments/${assessmentActiveName}/process/${eid}`);
        if (action1 === 'enable') {
            action1 = 'disable';
            ref1.on('value', snapshot => {
                const data = (snapshot.val() && snapshot.val().assessment) || 'Anonymous';
                const ref2 = firebase.database().ref(`/assessments/${assessmentActiveName}/doing/${eid}`);
                if (action2 === 'enable') {
                    action2 = 'disable';
                    ref2.set({
                        assessment: data,
                        status: 'reject',
                        comment: rejectMessage
                    })
                    .then(() => {
                        const ref3 = firebase.database().ref(`/assessments/${assessmentActiveName}/process/${eid}`);
                        if (action3 === 'enable') {
                            action3 = 'disable';
                            ref3.remove()
                            .then(() => {
                                dispatch({ type: REJECT_CREATE });
                                Actions.assessmentMangerPage({ type: 'reset' });
                            });
                        }
                    });
                }
            });
        }
        // assessmentCreateRepo(name, dispatch);
    };
};

export const assessmentNameChanged = (text) => {
    return {
        type: ASSESSMENT_NAME_CHANGED,
        payload: text
    };
};

export const assessmentReset = () => {
    return (dispatch) => {
        dispatch({ type: ASSESSMENT_RESET });
    };
};

const assessmentCreateFail = (dispatch) => {
    dispatch({ type: ASSESSMENT_CREATE_FAIL });
};

let dupName = '';

const setDuplicateID = (isDuplicate) => {
    dupName = isDuplicate;
    return dupName;
};

const getDuplicateID = () => {
    return dupName;
};

const checkNameAssessmentDuplicate = async(name) => {
    let count1 = 0;
    const ref1 = await firebase.database().ref('/assessments');
        if (count1 === 0) {
        count1++;
        ref1.on('value', snapshot => {        
            const allName = [];
            snapshot.forEach(nameAssessment => {
                allName.push(nameAssessment.child('name').val());
            });
            for (let i = 0; i < allName.length; i++) {
                if (allName[i] === name) {
                    setDuplicateID(true);
                    break;
                }
                setDuplicateID(false);
            }
        });
    }
    const dupState = await getDuplicateID();
    return dupState;
};

const checkNameAssessmentValidate = (name) => {
    const validate = {
        type: 'string',
        min_value: 4,
        max_value: 20,
        require: true
    };
    if (typeof name === validate.type 
        && name.length >= validate.min_value
        && name.length <= validate.max_value
    ) {
        return true;
    }
    // validateIDEmployeeFail(dispatch);
    return false;
};

const checkNameAssessment = async(name) => {
    try {
        const nameAssessmentDuplicateState = await checkNameAssessmentDuplicate(name);
        const nameAssessmentValidateState = await checkNameAssessmentValidate(name);
        console.log(nameAssessmentDuplicateState);
        if (!nameAssessmentDuplicateState && nameAssessmentValidateState) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error.message);
    }
};

const callGitLabSaveToFirebase = async() => {
    await axios.get('http://10.0.2.2:8000/getDataGitLabToFirebase')
      .then(response => {
            console.log(response);
    });
    return 0;
};

const assessmentCreateRepo = async(name, dispatch) => {
    let count1 = 0;
    let count2 = 0;
    try {
        const nameAssessmentState = await checkNameAssessment(name);
        if (nameAssessmentState) {
            await callGitLabSaveToFirebase();
                const ref1 = firebase.database().ref(`/assessments/${name}`);
                if (count1 === 0) {
                count1++;
                ref1.update({
                    name
                })
                    .then(() => {
                        const ref2 = firebase.database().ref('/assessments');
                        if (count2 === 0) {
                            count2++;
                            ref2.update({
                                active: name
                            })
                            .then(() => {
                                dispatch({ type: ASSESSMENT_CREATE_SUCCESS });
                                Actions.assessmentManagerLoding({ type: 'reset' });
                            });
                        }
                    });
                }
        } else {
            assessmentCreateFail(dispatch);
            console.log('Validate fail');
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const assessmentCreate = () => {
    return (dispatch) => {
        dispatch({ type: ASSESSMENT_CREATE });
        const year = (new Date()).getFullYear();
        const nameYear = year.toString();
        findAssessmentName(nameYear, dispatch);
    };
};

const findAssessmentName = (nameYear, dispatch) => {
    let count1 = 0;
    const ref1 = firebase.database().ref('/assessments');
    if (count1 === 0) {
        ref1.on('value', snapshot => {        
            const allName = [];
            snapshot.forEach(nameAssessment => {
                allName.push(nameAssessment.child('name').val());
            });
            if (count1 === 0) {
            const allNameAssessment = allName;
            count1++;
            let countName = 0;
            for (let i = 0; i < allNameAssessment.length; i++) {
                if (allNameAssessment[i] == null) {
                    break;
                }
                const str = allNameAssessment[i].toString();
                const res = str.substring(4, 0);
                if (res === nameYear) {
                    countName++;
                }
            }
            countName++;
            const numberAssessment = countName.toString();
            const name = nameYear.concat(numberAssessment);
            assessmentCreateRepo(name, dispatch);
            }
        });
    }
};

export const assessmentDisable = () => {
    let action = 'enable';
    let actionTwo = 'enable';
    let count1 = 0;
    const refname = firebase.database().ref('/assessments');
    if (count1 === 0) {
        count1++;
        refname.on('value', snapshot => {
            const active = (snapshot.val() && snapshot.val().active) || 'Anonymous';
            const data = {
                id_assessment: active
            };
            console.log(data);
            const requestBody = data;
            if (active !== 'disable') {
                const url = 'http://10.0.2.2:3000/getAllprojectForEmployee';
                
                axios.post(url, requestBody)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                console.log(active);
            }
        });
    }

    return () => {
        const ref = firebase.database().ref('/assessments');
        if (action === 'enable') {
            action = 'disable';
            ref.update({
                active: 'disable'
            })
            .then(() => {
                const refTwo = firebase.database().ref('/gitlab_id');
                if (actionTwo === 'enable') {
                    actionTwo = 'disable';
                    refTwo.remove()
                    .then(() => {
                        Actions.assessmentManagerLoding({ type: 'reset' });
                    });
                }
            });
        }
    };
};

export const assessmentCancle = () => {
    let action1 = 'enable';
    let action2 = 'enable';
    let action3 = 'enable';
    let action4 = 'enable';
    return () => {
        const ref1 = firebase.database().ref('/assessments');
        if (action1 === 'enable') {
            action1 = 'disable';
            ref1.on('value', snapshot => {
                const active = (snapshot.val() && snapshot.val().active) || 'Anonymous';
                const ref2 = firebase.database().ref(`/assessments/${active}`);
                if (action2 === 'enable') {
                    action2 = 'disable';
                    ref2.remove()
                    .then(() => {
                        const ref3 = firebase.database().ref('/assessments');
                        if (action3 === 'enable') {
                            action3 = 'disable';
                            ref3.update({
                                active: 'disable'
                            })
                            .then(() => {
                                const ref4 = firebase.database().ref('/gitlab_id');
                                if (action4 === 'enable') {
                                    action4 = 'disable';
                                    ref4.remove()
                                    .then(() => {
                                        Actions.assessmentManagerLoding({ type: 'reset' });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    };
};

export const assessmentSentToManager = ({ assessmentActiveName, eid }) => {
    let saveData = 'enable';
    const ref = firebase.database().ref(`/assessments/${assessmentActiveName}/doing/${eid}`);
    return () => {
        ref.on('value', snapshot => {
            const assessmentData = snapshot.val() || 'Anonymous';
            if (saveData === 'enable') {
                saveData = 'disable';
                const data = assessmentData;
                saveToProcess(assessmentActiveName, eid, data);
            }
        });
    };
};

const saveToProcess = (assessmentActiveName, eid, data) => {
    firebase.database().ref(`/assessments/${assessmentActiveName}/process/${eid}`)
    .set(data);
    firebase.database().ref(`/employees/${eid}`)
    .on('value', snapshot => {
        const name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
        firebase.database().ref(`/assessments/${assessmentActiveName}/process/${eid}`)
        .update({
            name
        });
    });
    firebase.database().ref(`/assessments/${assessmentActiveName}/doing/${eid}`)
        .update({ status: 'process' });
    firebase.database().ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment`).remove()
    .then(() => {
        Actions.assessmentSended({ type: 'reset' });
    });
};

export const assessmentsProcessFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/assessments')
            .on('value', snapshot => {
                const assessmentActiveName = snapshot.val().active || 'Anonymous';
                const ref = firebase.database().ref(`/assessments/${assessmentActiveName}/process`);
                ref.on('value', snap => {
                    dispatch({ type: ASSESSMENT_PROCESS_FETCH_SUCCESS, payload: snap.val() });
                });
            });
        };
};

export const processAssessmentUpdate = ({ prop, value }) => {
    return {
        type: PROCESS_ASSESSMENT_UPDATE,
        payload: { prop, value }
    };
};

export const approveAssessment = ({ assessmentActiveName, eid }) => {
    return () => {
        approveAssessmentRepo({ assessmentActiveName, eid });
    };
};

const approveAssessmentRepo = async({ assessmentActiveName, eid }) => {
    let count = 0;
    const path = `/assessments/${assessmentActiveName}/process/${eid}`;
    const ref = firebase.database().ref(`${path}`);
    await ref.on('value', snapshot => {
            const assessment = snapshot.val() || 'Anonymous';
            if (count === 0) {
                count++;

                const data = assessment.assessment;
                const name = assessment.name;
                
                writeAssessmentApprove(assessmentActiveName, eid, data, name);
                removeProcessAssessment({ assessmentActiveName, eid });
                readAssessmentApprove(assessmentActiveName, eid, name);
            }
    });
};

const writeAssessmentApprove = (assessmentActiveName, eid, data, name) => {
    const pathApprove = `/assessments/${assessmentActiveName}/approve/${eid}/assessment`;
            const refApprove = firebase.database().ref(`${pathApprove}`);
            refApprove.set({
                assessment: data, 
                name
            });
};

const removeProcessAssessment = ({ assessmentActiveName, eid }) => {
        const pathProcess = `/assessments/${assessmentActiveName}/process/${eid}`;
        const refProcess = firebase.database().ref(`${pathProcess}`);
        refProcess.remove();
};

const readAssessmentApprove = (assessmentActiveName, eid, name) => {
    let count = 0;
    const pathApprove = `/assessments/${assessmentActiveName}/approve/${eid}`;
            const refApprove = firebase.database().ref(`${pathApprove}`);
            refApprove.on('value', snapshot => {
                const assessment = snapshot.val() || 'Anonymous';
                if (count === 0) {
                    count++;
                    
                    // const thisAssesment = assessment;
                    // const dataAssessment = {
                    //     employee_id: eid,
                    //     assessment_id: assessmentActiveName,
                    //     assessment
                    // };
                    // // console.log(assessment);
                    // console.log(assessment);
                    const assessmentData = assessment.assessment;
                    // const name = assessment.name;
                    console.log(assessmentData);
                    
                    saveAssessmentToBlockchain(assessmentActiveName, eid, assessmentData, name);
                    Actions.assessmentMangerPage({ type: 'reset' });
                }
        });
};

const saveAssessmentToBlockchain = (assessmentActiveName, eid, assessmentData, name) => {
    const assessment = assessmentData.assessment;
    const data = {
        employee_id: eid,
        assessment_id: assessmentActiveName,
        name,
        assessment: {
            projects: assessment.projects,
            improvement: assessment.improvement,
            opinion: assessment.opinion,
            suggestion: assessment.suggestion
        }
    };
    
    const requestBody = data;
    
    const url = 'http://10.0.2.2:3000/setAssessment';
    
    axios.post(url, requestBody)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
};
