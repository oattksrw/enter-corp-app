import {
    NEW_PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    CHANGE_PASSWORD_RESET,
    NEW_PASSWORD_FAIL,
    CONFIRM_PASSWORD_FAIL,
    NEW_PASSWORD_SUCCESS,
    CONFIRM_PASSWORD_SUCCESS,
    PASSWORD_CHANGED_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    newPassword: '',
    confirmPassword: '',
    newPasswordFail: '',
    confirmPasswordFail: '',
    error: ' ',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_PASSWORD_CHANGED:
            return { ...state, newPassword: action.payload };
        case CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        case NEW_PASSWORD_FAIL:
            return { 
                ...state,
                newPasswordFail: 'this field is require between 6 - 20 character and Unique'
            };
        case CONFIRM_PASSWORD_FAIL:
            return { ...state, confirmPasswordFail: 'this field is not match' };  
        case PASSWORD_CHANGED_FAIL:
            return { ...state, error: 'กรุณาเข้าสู่ระบบใหม่อีกครั้งเพื่อเปลี่ยนรหัสผ่าน' };
        case NEW_PASSWORD_SUCCESS:
            return { ...state, newPasswordFail: '' };
        case CONFIRM_PASSWORD_SUCCESS:
            return { ...state, confirmPasswordFail: '' };
        case CHANGE_PASSWORD_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
