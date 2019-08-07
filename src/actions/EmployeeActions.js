import firebase from 'firebase';
// import * as admin from 'firebase-admin';
import SimpleCrypto from 'simple-crypto-js';
import { Actions } from 'react-native-router-flux';
import { 
    EMPLOYEE_UPDATE,
    EMPLOYEE_RESET,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    REGISTER_USER_FAIL,
    EMPLOYEE_SAVE_SUCCESS,
    ID_EMPLOYEE_FAIL,
    NAME_EMPLOYEE_FAIL,
    DEPARTMENT_EMPLOYEE_FAIL,
    EMPLOYEE_LOADING,
    EMPLOYEE_SAVE_LOADING,
    EMPLOYEE_DELETE_LOADING,
    GITLABID_EMPLOYEE_FAIL,
    EMPLOYEE_DELETE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeReset = () => {
    return (dispatch) => {
        dispatch({ type: EMPLOYEE_RESET });
    };
};

const registerUserFail = (dispatch) => {
    dispatch({ type: REGISTER_USER_FAIL });
};

const validateIDEmployeeFail = (dispatch) => {
    dispatch({ type: ID_EMPLOYEE_FAIL });
};

const validateNameEmployeeFail = (dispatch) => {
    dispatch({ type: NAME_EMPLOYEE_FAIL });
};

const validateDepartmentEmployeeFail = (dispatch) => {
    dispatch({ type: DEPARTMENT_EMPLOYEE_FAIL });
};

const validateGitLabIDEmployeeFail = (dispatch) => {
    dispatch({ type: GITLABID_EMPLOYEE_FAIL });
};

let dupID = '';

const setDuplicateID = (isDuplicate) => {
    dupID = isDuplicate;
    return dupID;
};

const getDuplicateID = () => {
    return dupID;
};

let dupGitLabID = false;

const setDuplicateGitLabID = (isDuplicate) => {
    dupGitLabID = isDuplicate;
    return dupGitLabID;
};

const getDuplicateGitLabID = () => {
    return dupGitLabID;
};

const checkDuplicateID = async(employeeData) => {
    await firebase.database().ref('/employees')
        .on('value', snapshot => {        
            const allID = [];
            snapshot.forEach(id => {
                allID.push(id.child('id').val());
            });
            for (let i = 0; i < allID.length; i++) {
                if (allID[i] === employeeData.eid) {
                    setDuplicateID(true);
                    break;
                }
                setDuplicateID(false);
            }
        });
    const dupState = await getDuplicateID();
    return dupState;
};

const checkDuplicateGitLabID = async(employeeData) => {
    let count1 = 0;
    let count2 = 0;
    let dupState = false;
    const ref1 = await firebase.database().ref('/employees');
        if (count1 === 0) {
        count1++;
        ref1.on('value', snapshot => {       
            const allID = [];
            snapshot.forEach(gitlabID => {
                // if (count2 === 0) {
                //     count2++;
                    allID.push(gitlabID.child('gitlab_id').val());
                // }
            });
            console.log(allID);
            console.log(employeeData);
            if (count2 === 0) {
                count2++;
                for (let i = 0; i < allID.length; i++) {
                    if (allID[i] === employeeData.gitlab_id && allID[i] !== '') {
                        console.log('what');
                        setDuplicateGitLabID(true);
                        break;
                    }
                    getDuplicateGitLabID(false);
                }
            }
        });
        dupState = await getDuplicateGitLabID();
        console.log('+++++++', dupState);
        
        return dupState;
        // const dupState = await getDuplicateGitLabID();
        // console.log('+++++++', dupState);
        // return dupState;
    }
    // const dupState = await getDuplicateGitLabID();
    // console.log('+++++++', dupState);
    
    return dupState;
};

const checkIDEmployee = async(employeeData, dispatch) => {
    const validate = {
        type: 'string',
        length: 6,
        require: true,
        duplicate: false
    };
    if (typeof employeeData.eid === validate.type && employeeData.eid.length === validate.length) {
        const isDuplicate = await checkDuplicateID(employeeData);
        if (!isDuplicate) {
            return true;
        }
        validateIDEmployeeFail(dispatch);
        return false;
    }
    validateIDEmployeeFail(dispatch);
    return false;
};

const checkGitLabID = async(employeeData, dispatch) => {
    const validate = {
        type: 'string',
        duplicate: false
    };
    if (typeof employeeData.gitlab_id === validate.type) {
        const isDuplicate = await checkDuplicateGitLabID(employeeData);
        console.log(isDuplicate);
        if (!isDuplicate) {
            return true;
        }
        validateGitLabIDEmployeeFail(dispatch);
        return false;
    }
    validateGitLabIDEmployeeFail(dispatch);
    return false;
};

const checkNameEmployee = (employeeData, dispatch) => {
    const validate = {
        type: 'string',
        min_value: 6,
        max_value: 20,
        require: true,
        duplicate: true
    };
    if (typeof employeeData.name === validate.type 
        && employeeData.name.length >= validate.min_value
        && employeeData.name.length <= validate.max_value
    ) {
        return true;
    }
    validateNameEmployeeFail(dispatch);
    return false;
};

const checkDepartmentEmployee = (employeeData, dispatch) => {
    //validate(have,Text,<=20,req)
    const validate = {
        type: 'string',
        min_value: 6,
        max_value: 20,
        require: true,
        duplicate: true
    };
    if (typeof employeeData.department === validate.type 
        && employeeData.department.length >= validate.min_value
        && employeeData.department.length <= validate.max_value
    ) {
        return true;
    } 
    validateDepartmentEmployeeFail(dispatch);
    return false;
};

const renderEmployeeList = () => {
    return Actions.employeeList({ type: 'reset' });
};

const createEmployeeRepository = async(employeeData, dispatch) => {
    try {
        const idEmployeeState = await checkIDEmployee(employeeData, dispatch);
        const nameEmployeeState = await checkNameEmployee(employeeData, dispatch);
        const departmentEmployeeState = await checkDepartmentEmployee(employeeData, dispatch);
        const gitLabIDState = await checkGitLabID(employeeData, dispatch);
        // await createEmployeeAccount(employeeData, dispatch);
        // const createEmployeeState = await getCreateEmployeeAccount();

        // console.log('//////////////----------', createEmployeeState, '//////////////////');
        // const secretKey = 'some-unique-key';
        // const simpleCrypto = new SimpleCrypto(secretKey);
        // const plainText = 'password';
        // const cipherText = simpleCrypto.encrypt(plainText);
        // console.log('Encryption process...');
        // console.log(`Plain Text    : ${plainText}`);
        // console.log(`Cipher Text   : ${cipherText}`);
        // const decipherText = simpleCrypto.decrypt(cipherText);
        // console.log('... and then decryption...');
        // console.log(`Decipher Text : ${decipherText}`);
        // console.log('... done.');

        // firebase.database().ref('/manager').update({
        //     password: cipherText
        // });

        // firebase.database().ref('/manager')
        // .on('value', snapshot => {   
        //     const password = (snapshot.val() && snapshot.val().password) || 'Anonymus';
        //     const decipherText = simpleCrypto.decrypt(password);
        //     console.log(decipherText);
        // });

        // if (false) {
        if (idEmployeeState && nameEmployeeState && departmentEmployeeState && gitLabIDState) {
            // dupGitLabID = '';
            const secretKey = 'some-unique-key';
            const simpleCrypto = new SimpleCrypto(secretKey);
            const plainText = employeeData.password;
            const cipherText = simpleCrypto.encrypt(plainText);
            firebase.auth()
            .createUserWithEmailAndPassword(employeeData.username, employeeData.password)
            .then(() => {
                console.log('Successfully created new authen:');
                const { currentUser } = firebase.auth();
                firebase.database().ref(`/employees/${employeeData.eid}`)
                    .set({
                        id: employeeData.eid,
                        name: employeeData.name, 
                        department: employeeData.department, 
                        gitlab_id: employeeData.gitlab_id,
                        gen: employeeData.gen,
                        // address: employeeData.address, 
                        // email: employeeData.email, 
                        // tell: employeeData.tell,
                        userID: currentUser.uid,
                        username: employeeData.username,
                        // password: employeeData.password
                        password: cipherText
                    })
                        .then(() => {
                            // Actions.managerMain({ type: 'reset' });
                            console.log('Successfully created new employee:');
                            dispatch({ type: EMPLOYEE_CREATE });
                            const users = { employee_id: employeeData.eid, type: 'employee' };
                            //getUidUser
                            firebase.database().ref(`/users/${currentUser.uid}`)
                            .set(users)
                            .then(() => {
                                const login = getManagerAccount();
                                // login for admin
                                firebase.auth().signInWithEmailAndPassword(
                                    login.id, login.password);
                                console.log(login);
                                
                                // Actions.auth({ type: 'reset' });
                                renderEmployeeList();
                                console.log('Successfully created new user:');
                            })
                            .catch(() => { 
                                console.log('Error creating new user::');
                            });
                        })
                        .catch(() => { 
                            console.log('Error creating new employee::');
                        });
                })
                .catch(() => {
                    registerUserFail(dispatch);
                    console.log('Error creating new authen:');
                });
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const employeeCreate = ({ 
        eid, 
        name, 
        department,
        gitlab_id,
        gen, 
        // address, 
        // email, 
        // tell, 
        username, 
        password 
    }) => {
    return (dispatch) => {
        dispatch({ type: EMPLOYEE_LOADING });
        const employeeData = { 
            eid, 
            name, 
            department, 
            gitlab_id, 
            gen, 
            // address, 
            // email, 
            // tell, 
            username, 
            password 
        };
        createEmployeeRepository(employeeData, dispatch);
    };
};

let managerAccount = {};

const setManagerAccount = (login) => {
    managerAccount = login;
};

const getManagerAccount = () => {
    return managerAccount;
};

export const employeesFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/manager')
        .on('value', snapshot => {
            const login = snapshot.val();
            const secretKey = 'some-unique-key';
            const simpleCrypto = new SimpleCrypto(secretKey);
            const decipherText = simpleCrypto.decrypt(login.password);
            login.password = decipherText;
            setManagerAccount(login);
        });

        firebase.database().ref('/employees')
        .on('value', snapshot => {
            dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const employeeSave = ({ 
    name, 
    department, 
    gitlab_id, 
    gen, 
    // address, 
    // email, 
    // tell, 
    uid 
}) => {
    const employee = firebase.database().ref(`employees/${uid}`);
   
    return (dispatch) => {
        dispatch({ type: EMPLOYEE_SAVE_LOADING });
        employee.update({ 
            name, 
            department, 
            gitlab_id, 
            gen, 
            // address, 
            // email, 
            // tell 
        })
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset' });
            });
    };
};

let loginUserAccount = {};

const setLoginUserAccount = (login) => {
    const secretKey = 'some-unique-key';
    const simpleCrypto = new SimpleCrypto(secretKey);
    const decipherText = simpleCrypto.decrypt(login.password);
    loginUserAccount = {
        username: login.username,
        password: decipherText
    };
};

const getLoginUserAccount = () => {
    return loginUserAccount;
};

export const employeeDelete = ({ uid }) => {
    const employee = firebase.database().ref(`/employees/${uid}`);
    firebase.database().ref(`/employees/${uid}`)
        .once('value').then((snap) => {
            const login = snap.val();
            setLoginUserAccount(login);
        });
    const userID = firebase.database().ref(`/employees/${uid}`);
    userID.once('value').then((snapshot) => {
            const accountID = (snapshot.val() && snapshot.val().userID) || 'Anonymous';
            console.log(accountID);
        });
    return (dispatch) => {   
        dispatch({ type: EMPLOYEE_DELETE_LOADING });
        firebase.database().ref(`/employees/${uid}`)
            .once('value').then((snapshot) => {
                const accountID = (snapshot.val() && snapshot.val().userID) || 'Anonymous';
                const userAccount = firebase.database().ref(`/users/${accountID}`);
                userAccount.remove()
                    .then(() => { 
                        console.log('Remove User');
                        employee.remove()
                            .then(() => {
                                console.log('Remove Employee');
                                const loginAccount = getLoginUserAccount();
                                firebase.auth().signInWithEmailAndPassword(
                                    loginAccount.username, loginAccount.password)
                                    .then(() => {
                                        console.log('Login success EM');
                                        const user = firebase.auth().currentUser;
                                        user.delete().then(() => {
                                            firebase.auth().signOut();
                                            console.log('delete account');
                                            const login = getManagerAccount();
                                            
                                            firebase.auth().signInWithEmailAndPassword(
                                                login.id, login.password)
                                                .then(() => {
                                                    console.log('+++SUCCESS+++');
                                                    dispatch({ type: EMPLOYEE_DELETE_SUCCESS });
                                                    renderEmployeeList();
                                                });
                                        // User deleted.
                                        }).catch((error) => {
                                            console.log('error: ', error); 
                                        });
                                    });
                            });
                     });
            });
    };
};
