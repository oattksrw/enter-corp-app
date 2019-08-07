import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    PROJECT_UPDATE,
    PROJECTS_FETCH_SUCCESS,
    PROJECTS_SELECT_FETCH_SUCCESS,
    PROJECTS_SELECT_FETCH_FAIL,
    PROJECTS_SELECT_FETCH_SS,
    PROJECTS_FETCH_FAIL,
    PROJECTS_FETCH_SS,
    // PROJECTS_ADDITIONAL_FETCH_SUCCESS,
    PROJECTS_PROCESS_FETCH_SUCCESS,
    PROCESS_PROJECT_UPDATE,
    PROJECT_FAIL
} from './types';

export const projectUpdate = ({ prop, value }) => {
    return {
        type: PROJECT_UPDATE,
        payload: { prop, value }
    };
};

export const projectsSelectFetch = ({ gitlabID }) => {
    return (dispatch) => {
        const projectRef = firebase.database().ref(`/gitlab_id/${gitlabID}/projects`);
        projectRef.orderByChild('status').equalTo('has not been used').on('value', snapshot => {
            if (snapshot.val() === null) {
                dispatch({ type: PROJECTS_SELECT_FETCH_FAIL });
            } else {
                dispatch({ type: PROJECTS_SELECT_FETCH_SS });
            }
            dispatch({ type: PROJECTS_SELECT_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

// const removeArrayThatNull = (arr) => {
//     const arraylength = arr.length;
//     let i = 0;
//     let j = 0;
//     for (i = 0; i < arraylength; i++) {
//         for (j = 0; j < arraylength; j++) {
//             if (arr[j] == null) {
//                 arr.splice(j, 1);
//                 i += 1;
//                 j += 1;
//                 break;
//             }
//         }
//     }
//     return arr;
// };

export const projectsFetch = ({ assessmentActiveName, eid }) => {
    return (dispatch) => {
        const projectRef = firebase.database()
            .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects`); 
        projectRef.on('value', snapshot => {
                if (snapshot.val() === null) {
                    dispatch({ type: PROJECTS_FETCH_FAIL });
                } else {
                    dispatch({ type: PROJECTS_FETCH_SS });
                }
                dispatch({ type: PROJECTS_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

// export const projectsAdditionalFetch = ({ assessmentActiveName, eid }) => {
//     return (dispatch) => {
//         const keyAssessment = assessmentActiveName;
//         const projectRef = firebase.database()
//             .ref(`/assessments/${keyAssessment}/doing/${eid}/assessment/projects/additional`);
//         projectRef.on('value', snapshot => {
//                 dispatch({ type: PROJECTS_ADDITIONAL_FETCH_SUCCESS, payload: snapshot.val() });
//             });
//     };
// };

export const projectCreate = ({ 
    projectKey, gitlabID, name, assessmentActiveName, eid, numProject, project_id
}) => {
    const ref = firebase.database().ref(
        `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/${numProject}`
    );
   
    return () => {
        ref.update({ 
            name,
            project_id
        })
            .then(() => {
                const projectRef = 
                firebase.database().ref(`/gitlab_id/${gitlabID}/projects/${projectKey}`);
                projectRef.update({
                    status: 'used'
                })
                .then(() => {
                    Actions.assessmentProjectEmployeePage({ type: 'reset' });
                });
            });
    };
};

export const projectAdditionalCreate = ({
    projectName,
    workName,
    result,
    weight,
    score,
    assessmentActiveName, 
    eid, 
    numProject
}) => {
    const projectData = {
        projectName,
        workName,
        result,
        weight,
        score,
        assessmentActiveName, 
        eid,
        numProject
    };
    console.log(weight);
    
    return (dispatch) => {
        const firstField = 'additional';
        const projectID = firstField.concat(numProject);
        projectAdditionalCreateRepo(projectData, projectID, dispatch);
    };
};

const projectAdditionalCreateRepo = async(projectData, projectID, dispatch) => {
    const validateProject = await validateProjectRepo(projectData, dispatch);
    const validateWork = await validateWorkRepo(projectData, dispatch);
    const validateResult = await validateResultRepo(projectData, dispatch);
    if (validateProject && validateWork && validateResult) {
        const keyAssessment = projectData.assessmentActiveName;
        const ref = firebase.database().ref(
            `/assessments/${keyAssessment}/doing/${projectData.eid}/assessment/projects/${projectData.numProject}`
        );
        ref.update({
            id: projectID,
            name: projectData.projectName,
            works: {
                0: {
                    name: projectData.workName,
                    result: projectData.result,
                    weight: projectData.weight,
                    score_of_employee: projectData.score,
                    score_of_manager: projectData.score
                }
            }
        })
        .then(() => {
            Actions.assessmentProjectEmployeePage({ type: 'reset' });
        });
        // firebase.database()
        // .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment/opinion`)
        //     .set({
        //         self: opinionData.self,
        //         team: opinionData.team,
        //         manager: opinionData.manager,
        //         office: opinionData.office,
        //         person: opinionData.person
        //     }).then(() => {
        //         dispatch({ type: OPINION_CREATE });
        //         Actions.assessmentEmployeePage({ type: 'reset' });
        //     });
    }
};

const validateProjectRepo = async(projectData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 20,
        require: true,
        duplicate: true
    };
    if (typeof projectData.projectName === validate.type 
        && projectData.projectName.length >= validate.min_value
        && projectData.projectName.length <= validate.max_value
    ) {
        return true;
    }
    validateProjectFail(dispatch);
    return false;
};

const validateWorkRepo = async(projectData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 20,
        require: true,
        duplicate: true
    };
    if (typeof projectData.workName === validate.type 
        && projectData.workName.length >= validate.min_value
        && projectData.workName.length <= validate.max_value
    ) {
        return true;
    }
    validateProjectFail(dispatch);
    return false;
};

const validateResultRepo = async(projectData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 1,
        max_value: 20,
        require: true,
        duplicate: true
    };
    if (typeof projectData.result === validate.type 
        && projectData.result.length >= validate.min_value
        && projectData.result.length <= validate.max_value
    ) {
        return true;
    }
    validateProjectFail(dispatch);
    return false;
};

const validateProjectFail = (dispatch) => {
    dispatch({ type: PROJECT_FAIL });
};


export const projectProcessFetch = ({ projects }) => {
    return (dispatch) => {
        dispatch({ type: PROJECTS_PROCESS_FETCH_SUCCESS, payload: projects });
    };
};

export const projectProcessUpdate = ({ prop, value }) => {
    return {
        type: PROCESS_PROJECT_UPDATE,
        payload: { prop, value }
    };
};
