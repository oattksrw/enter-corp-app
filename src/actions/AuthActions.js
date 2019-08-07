import firebase from 'firebase';
import SimpleCrypto from 'simple-crypto-js';
import { Actions } from 'react-native-router-flux';
import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    PASSWORD_CHANGED_FAIL,
    NEW_PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    NEW_PASSWORD_FAIL,
    CONFIRM_PASSWORD_FAIL,
    NEW_PASSWORD_SUCCESS,
    CONFIRM_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_RESET
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }; 
};

export const newPasswordChanged = (text) => {
    return {
        type: NEW_PASSWORD_CHANGED,
        payload: text
    }; 
};

export const confirmPasswordChanged = (text) => {
    return {
        type: CONFIRM_PASSWORD_CHANGED,
        payload: text
    }; 
};

export const changePasswordReset = () => {
    return (dispatch) => {
        dispatch({ type: CHANGE_PASSWORD_RESET });
    };
};

export const passwordUpdate = ({ newPassword, confirmPassword }) => {
    return (dispatch) => {
        const passwordData = { 
            newPassword, confirmPassword 
        };
        passwordUpdateRepository(passwordData, dispatch);
    };
};

const passwordChangedFail = (dispatch) => {
    dispatch({ type: PASSWORD_CHANGED_FAIL });
};

const validateNewPasswordFail = (dispatch) => {
    dispatch({ type: NEW_PASSWORD_FAIL });
};

const validateConfirmPasswordFail = (dispatch) => {
    dispatch({ type: CONFIRM_PASSWORD_FAIL });
};

const validateNewPasswordSuccess = (dispatch) => {
    dispatch({ type: NEW_PASSWORD_SUCCESS });
};

const validateConfirmPasswordSuccess = (dispatch) => {
    dispatch({ type: CONFIRM_PASSWORD_SUCCESS });
};

const checkNewPassword = (passwordData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 6,
        max_value: 20,
        require: true,
        duplicate: true
    };
    if (typeof passwordData.newPassword === validate.type 
        && passwordData.newPassword.length >= validate.min_value
        && passwordData.newPassword.length <= validate.max_value
    ) {
        validateNewPasswordSuccess(dispatch);
        return true;
    } 
    validateNewPasswordFail(dispatch);
    return false;
};

const checkConfirmPassword = (passwordData, dispatch) => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
        validateConfirmPasswordSuccess(dispatch);
        return true;
    } 
    validateConfirmPasswordFail(dispatch);
    return false;
};

let myPassword = '';

const setMyPassword = (text) => {
    myPassword = text;
};

const getMyPassword = () => {
    return myPassword;
};

const findPasswordEmployee = async(eid) => {
    await firebase.database().ref(`/employees/${eid}`)
        .once('value')
            .then(async(snapshot) => {
                const oldPassword = (snapshot.val() && snapshot.val().password) || 'Anonymous';
                const secretKey = 'some-unique-key';
                const simpleCrypto = new SimpleCrypto(secretKey);
                const plainText = oldPassword;
                const cipherText = simpleCrypto.encrypt(plainText);
                await setMyPassword(cipherText);
            });
    return 0;
};

const setOldasswordEmployee = (pw, eid) => {
    firebase.database().ref(`/employees/${eid}`)
        .update({
            password: pw
        });
};

const findPasswordManager = async() => {
    await firebase.database().ref('/manager')
        .once('value')
            .then((snapshot) => {
                const oldPassword = (snapshot.val() && snapshot.val().password) || 'Anonymous';
                const secretKey = 'some-unique-key';
                const simpleCrypto = new SimpleCrypto(secretKey);
                const plainText = oldPassword;
                const cipherText = simpleCrypto.encrypt(plainText);
                setMyPassword(cipherText);
            });
    return 0;
};

const setOldasswordManager = (pw) => {
    firebase.database().ref('/manager')
        .update({
            password: pw
        });
};

const changePasswordEmployee = (passwordData, dispatch) => {
    const secretKey = 'some-unique-key';
    const simpleCrypto = new SimpleCrypto(secretKey);
    const plainText = passwordData.newPassword;
    const cipherText = simpleCrypto.encrypt(plainText);
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${userId}`)
                .once('value')
                    .then(async(snapshot) => {
                        const eid = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
                        await findPasswordEmployee(eid);
                        firebase.database().ref(`/employees/${eid}`)
                            .update({
                                password: cipherText
                            })
                                .then(() => {
                                    const user = firebase.auth().currentUser;
                                    user.updatePassword(passwordData.newPassword)
                                        .then(() => {
                                            console.log('Change Success');
                                            Actions.settingPage({ type: 'reset' });
                                        })
                                        .catch(() => {
                                            const pw = getMyPassword();
                                            console.log(pw);
                                            setOldasswordEmployee(pw, eid);
                                            passwordChangedFail(dispatch);
                                        });
                                });               
        });
};

const changePasswordManager = async(passwordData, dispatch) => {
    const secretKey = 'some-unique-key';
    const simpleCrypto = new SimpleCrypto(secretKey);
    const plainText = passwordData.newPassword;
    const cipherText = simpleCrypto.encrypt(plainText);
    let count1 = 0;
    let count2 = 0;
    await findPasswordManager();
    const ref1 = await firebase.database().ref('/manager');
        if (count1 === 0) {
            count1++;
            ref1.update({
                password: cipherText
            })
                .then(() => {
                    const user = firebase.auth().currentUser;
                    if (count2 === 0) {
                        count2++;
                        user.updatePassword(passwordData.newPassword)
                        .then(() => {
                            console.log('Change Success');
                            Actions.settingPage();
                        })
                        .catch(() => {
                            const pw = getMyPassword();
                            setOldasswordManager(pw);
                            passwordChangedFail(dispatch);
                        });
                    }
                });
        }
};

const passwordUpdateRepository = async(passwordData, dispatch) => {
    let count1 = 0;
    try {
        const checkNewPasswordState = await checkNewPassword(passwordData, dispatch);
        const checkConfirmPasswordState = await checkConfirmPassword(passwordData, dispatch);
        if (checkNewPasswordState && checkConfirmPasswordState) {
            const userId = firebase.auth().currentUser.uid;
            firebase.database().ref(`/users/${userId}`)
                .once('value').then((snapshot) => {
                const typeUser = (snapshot.val() && snapshot.val().type) || 'Anonymous';
                console.log(typeUser);
                if (count1 === 0) {
                    count1++;
                    switch (typeUser) {
                        case 'employee':
                            return changePasswordEmployee(passwordData, dispatch);
                        case 'manager':
                            return changePasswordManager(passwordData, dispatch);
                        default: return 0;
                    }
                }
            });
            // console.log(typeUser);
            // if (typeUser === 'employee') {
            //     if (typeUser === 'employee') {
            //         const userId = firebase.auth().currentUser.uid;
            //         firebase.database().ref(`/users/${userId}`)
            //             .once('value').then((snap) => {
            //             const employeeID = (snap.val() && snap.val().employee_id) || 'Anonymous';
            //             firebase.database().ref(`/employees/${employeeID}`)
            //                 .update({ password: passwordData.newPassword })
            //                 .then(() => {
            //                     const user = firebase.auth().currentUser;
            //                     user.updatePassword(passwordData.newPassword)
            //                     .then(() => {
            //                         console.log('Change Success');
            //                     })
            //                     .catch((error) => {
            //                         console.log(error);
            //                     });
            //                 });
            //         });
            //     } else if (typeUser === 'manager') {
            //         findPassword(typeUser, passwordData, dispatch);
            //         return 0;
            //     } else {
            //         console.log(typeUser);
            //         return 0;
            //     }
            //}
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user);
            })
            .catch(() => {
                // firebase.auth().createUserWithEmailAndPassword(email, password)
                // .then(user => loginUserSuccess(dispatch, user))
                // .catch(() => loginUserFail(dispatch));
                loginUserFail(dispatch);
            });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${userId}`)
        .once('value').then((snapshot) => {
        const typeUser = (snapshot.val() && snapshot.val().type) || 'Anonymous';
        renderPage(typeUser);
    });
};

const renderPage = (typeUser) => {
    console.log('RUN PAGE AUTO');
    switch (typeUser) {
        case 'employee':
            return Actions.employeeMain();
        case 'manager':
            return Actions.managerMain();
        default: return Actions.anotherMain();
    }
};

export const logoutUser = () => {
    firebase.auth().signOut();
    Actions.auth({ type: 'reset' });
    // Actions.int();
};
