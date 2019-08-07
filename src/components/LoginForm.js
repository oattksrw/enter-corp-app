import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import { 
    emailChanged, passwordChanged, loginUser 
} from '../actions';

class Loginform extends Component {
    componentWillMount() {
        firebase.auth().signOut();
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
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
                title='Log in'
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
        );
    }
 
    render() {
        return (
            <View 
                style={{
                    paddingTop: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    style={{ width: 240, height: 240 }}
                    source={{ uri: 'http://www.blockchain.fish/wp-content/uploads/2016/12/logo_black.png' }}
                />
                <Card>
                    <Input
                        placeholder='Email Address'
                        containerStyle={{ marginTop: 20, alignSelf: 'center' }} 
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        leftIcon={
                            <Icon
                              name='user'
                              size={24}
                              color='black'
                            />
                        }
                    />
                    <Input
                        secureTextEntry
                        placeholder='Password'
                        containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        leftIcon={
                            <Icon
                              name='lock'
                              size={24}
                              color='black'
                            />
                        }
                    />
                    {this.renderError()}
                    {this.renderButton()}
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    },
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser
})(Loginform);
