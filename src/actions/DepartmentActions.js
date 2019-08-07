import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { 
    DEPARTMENT_UPDATE,
    DEPARTMENT_RESET,
    DEPARTMENT_CREATE,
    NAME_DEPARTMENT_FAIL,
    DEPARTMENTS_FETCH_SUCCESS,
    DEPARTMENT_SAVE_SUCCESS,
    DEPARTMENT_LOADING,
    DEPARTMENT_SAVE_LOADING,
    DEPARTMENT_DELETE_LOADING
} from './types';

export const departmentUpdate = ({ prop, value }) => {
    return {
        type: DEPARTMENT_UPDATE,
        payload: { prop, value }
    };
};

export const departmentReset = () => {
    return (dispatch) => {
        dispatch({ type: DEPARTMENT_RESET });
    };
};

const validateNameDepartmentFail = (dispatch) => {
    dispatch({ type: NAME_DEPARTMENT_FAIL });
};

let dupName = '';

const setDuplicateName = (isDuplicate) => {
    dupName = isDuplicate;
    return dupName;
};

const getDuplicateName = () => {
    return dupName;
};

const checkDuplicateName = async(departmentData) => {
    await firebase.database().ref('/departments')
        .on('value', snapshot => { 
            const allName = [];
            snapshot.forEach(ss => {
                allName.push(ss.child('name').val());
            });
            for (let i = 0; i < allName.length; i++) {
                if (allName[i] === departmentData.name) {
                    setDuplicateName(true);
                    break;
                }
                setDuplicateName(false);
            }
        });
    const dupState = await getDuplicateName();
    return dupState;
};

const validateNameDepartment = async(departmentData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 4,
        max_value: 20,
        require: true,
        duplicate: false
    };
    if (typeof departmentData.name === validate.type 
        && departmentData.name.length >= validate.min_value
        && departmentData.name.length <= validate.max_value
    ) {
        const isDuplicate = await checkDuplicateName(departmentData);
        if (!isDuplicate) {           
            return true;
        }
        validateNameDepartmentFail(dispatch);
        return false;
    }
    validateNameDepartmentFail(dispatch);
    return false;
};

const createDepartmentRepository = async(departmentData, dispatch) => {
    try {
        const NameDepartmentState = await validateNameDepartment(departmentData, dispatch);
        if (NameDepartmentState) {
            firebase.database().ref(`/departments/${departmentData.name}`)
                    .set({
                        name: departmentData.name, 
                    })
                    .then(() => {
                        dispatch({ type: DEPARTMENT_CREATE });
                        Actions.departmentList({ type: 'reset' });

                        if (departmentData.monStatus === 'enable') {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/mon`
                            )
                                .set({
                                    start: departmentData.monStart,
                                    end: departmentData.monEnd,
                                    status: 'enable'
                                });
                        } else {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/mon`
                            )
                                .set({
                                    start: 'undefined',
                                    end: 'undefined',
                                    status: 'disable'
                                });
                        }

                        if (departmentData.tueStatus === 'enable') {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/tue`
                            )
                                .set({
                                    start: departmentData.tueStart,
                                    end: departmentData.tueEnd,
                                    status: 'enable'
                                });
                        } else {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/tue`
                            )
                                .set({
                                    start: 'undefined',
                                    end: 'undefined',
                                    status: 'disable'
                                });
                        }

                        if (departmentData.wedStatus === 'enable') {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/wed`
                            )
                                .set({
                                    start: departmentData.wedStart,
                                    end: departmentData.wedEnd,
                                    status: 'enable'
                                });
                        } else {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/wed`
                            )
                                .set({
                                    start: 'undefined',
                                    end: 'undefined',
                                    status: 'disable'
                                });
                        }

                        if (departmentData.thuStatus === 'enable') {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/thu`
                            )
                                .set({
                                    start: departmentData.thuStart,
                                    end: departmentData.thuEnd,
                                    status: 'enable'
                                });
                        } else {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/thu`
                            )
                                .set({
                                    start: 'undefined',
                                    end: 'undefined',
                                    status: 'disable'
                                });
                        }

                        if (departmentData.friStatus === 'enable') {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/fri`
                            )
                                .set({
                                    start: departmentData.friStart,
                                    end: departmentData.friEnd,
                                    status: 'enable'
                                });
                        } else {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/fri`
                            )
                                .set({
                                    start: 'undefined',
                                    end: 'undefined',
                                    status: 'disable'
                                });
                        }

                        if (departmentData.satStatus === 'enable') {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/sat`
                            )
                                .set({
                                    start: departmentData.satStart,
                                    end: departmentData.satEnd,
                                    status: 'enable'
                                });
                        } else {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/sat`
                            )
                                .set({
                                    start: 'undefined',
                                    end: 'undefined',
                                    status: 'disable'
                                });
                        }

                        if (departmentData.sunStatus === 'enable') {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/sun`
                            )
                                .set({
                                    start: departmentData.sunStart,
                                    end: departmentData.sunEnd,
                                    status: 'enable'
                                });
                        } else {
                            firebase.database().ref(
                                `/departments/${departmentData.name}/datetime/sun`
                            )
                                .set({
                                    start: 'undefined',
                                    end: 'undefined',
                                    status: 'disable'
                                });
                        }
                    });
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const departmentCreate = ({ 
        name,
        monStatus,
        monStart,
        monEnd,
        tueStatus,
        tueStart,
        tueEnd,
        wedStatus,
        wedStart,
        wedEnd,
        thuStatus,
        thuStart,
        thuEnd,
        friStatus,
        friStart,
        friEnd,
        satStatus,
        satStart,
        satEnd,
        sunStatus,
        sunStart,
        sunEnd
    }) => {
    const departmentData = { 
        name,
        monStatus,
        monStart,
        monEnd,
        tueStatus,
        tueStart,
        tueEnd,
        wedStatus,
        wedStart,
        wedEnd,
        thuStatus,
        thuStart,
        thuEnd,
        friStatus,
        friStart,
        friEnd,
        satStatus,
        satStart,
        satEnd,
        sunStatus,
        sunStart,
        sunEnd
    };
    return (dispatch) => {
        dispatch({ type: DEPARTMENT_LOADING });
        createDepartmentRepository(departmentData, dispatch);
    };
};

export const departmentsFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/departments')
        .on('value', snapshot => {
            dispatch({ type: DEPARTMENTS_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const departmentSave = ({ 
    name,
    monStatus,
    monStart,
    monEnd,
    tueStatus,
    tueStart,
    tueEnd,
    wedStatus,
    wedStart,
    wedEnd,
    thuStatus,
    thuStart,
    thuEnd,
    friStatus,
    friStart,
    friEnd,
    satStatus,
    satStart,
    satEnd,
    sunStatus,
    sunStart,
    sunEnd
}) => {
    const department = firebase.database().ref(`departments/${name}`);
    return (dispatch) => {
        dispatch({ type: DEPARTMENT_SAVE_LOADING });
        department.set({ 
            name,
            datetime: {
                mon: {
                    start: monStart,
                    end: monEnd,
                    status: monStatus
                },
                tue: {
                    start: tueStart,
                    end: tueEnd,
                    status: tueStatus
                },
                wed: {
                    start: wedStart,
                    end: wedEnd,
                    status: wedStatus
                },
                thu: {
                    start: thuStart,
                    end: thuEnd,
                    status: thuStatus
                },
                fri: {
                    start: friStart,
                    end: friEnd,
                    status: friStatus
                },
                sat: {
                    start: satStart,
                    end: satEnd,
                    status: satStatus
                },
                sun: {
                    start: sunStart,
                    end: sunEnd,
                    status: sunStatus
                }
            }
        })
            .then(() => {
                dispatch({ type: DEPARTMENT_SAVE_SUCCESS });
                Actions.departmentList({ type: 'reset' });
            });
    };
};

export const departmentDelete = ({ name }) => {
    const department = firebase.database().ref(`/departments/${name}`);
    return (dispatch) => {
        dispatch({ type: DEPARTMENT_DELETE_LOADING });
        department.remove()
        .then(() => {
          Actions.departmentList({ type: 'reset' });
        });
    };
};
