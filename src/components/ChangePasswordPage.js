import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import {
    newPasswordChanged,
    confirmPasswordChanged,
    changePasswordReset,
    passwordUpdate
} from '../actions';

class ChangePasswordPage extends Component {
    componentWillMount() {
        this.props.changePasswordReset();
    }

    onNewPasswordChange(text) {
        this.props.newPasswordChanged(text);
    }

    onConfirmPasswordChange(text) {
        this.props.confirmPasswordChanged(text);
    }

    onButtonPress() {
        Alert.alert(
            'Chang password',
            'Are you sure to delete',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { 
                    text: 'OK',
                    onPress: () => {
                        const { newPassword, confirmPassword } = this.props;
                        this.props.passwordUpdate({ newPassword, confirmPassword });
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    renderNewPasswordError() {
        if (this.props.newPasswordFail) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.newPasswordFail}
                    </Text>
                </View>
            );
        }
    }

    renderConfirmPasswordError() {
        if (this.props.confirmPasswordFail) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.confirmPasswordFail}
                    </Text>
                </View>
            );
        }
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        return (
            <View 
                style={{
                    paddingTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button
                    loading={this.props.loading}
                    icon={
                        <Icon
                        name='arrow-right'
                        size={15}
                        color='white'
                        />
                    }
                    iconRight
                    title='Change Password'
                    buttonStyle={{
                        backgroundColor: lightGreen500,
                        width: 300,
                        height: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                    onPress={this.onButtonPress.bind(this)}
                />
            </View>
        );
    }
 
    render() {
        return (
            <View style={{ paddingTop: 60 }}>
                <Card>
                    <Text>new password</Text>
                    <Input
                        placeholder='new password'
                        containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                        onChangeText={this.onNewPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                    {this.renderNewPasswordError()}
                    <Text>confirm new password</Text>
                    <Input
                        placeholder='confirm new password'
                        containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                        onChangeText={this.onConfirmPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                    {this.renderConfirmPasswordError()}
                    {this.renderError()}
                    {this.renderButton()}
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    },
};

const mapStateToProps = ({ changePassword }) => {
    const {
        newPassword,
        confirmPassword,
        newPasswordFail,
        confirmPasswordFail,
        error,
        loading 
    } = changePassword;
    return {
        newPassword,
        confirmPassword,
        newPasswordFail,
        confirmPasswordFail,
        error,
        loading 
    };
};

export default connect(mapStateToProps, {
    newPasswordChanged,
    confirmPasswordChanged,
    changePasswordReset,
    passwordUpdate
})(ChangePasswordPage);
