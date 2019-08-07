import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    blue500
} from 'material-ui/styles/colors';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeCreate, employeeReset } from '../actions';

class EmployeeCreate extends Component {
    componentWillMount() {
        this.props.employeeReset();
    }
    onButtonPress() {
        const { 
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
        } = this.props;
        
        this.props.employeeCreate({ 
            eid,
            name, 
            department,
            gitlab_id,
            gen: gen || 'male',
            // address,
            // email,
            // tell, 
            username, 
            password 
        });
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

    render() {
        return (
            <View>
                <ScrollView contentContainerStyle={{ paddingVertical: 60 }}>
                    <Card>
                        <Input
                            label='employee id'
                            placeholder='6digit'
                            containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                            value={this.props.eid}
                            onChangeText={
                                value => this.props.employeeUpdate({ prop: 'eid', value })
                            }
                            errorMessage={this.props.id_error}
                            maxLength={6}
                        />
                    </Card>
                    <EmployeeForm {...this.props} />
                    <Card>
                        <Input
                            label='username'
                            placeholder='email@domain.com'
                            containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                            value={this.props.username}
                            onChangeText={
                                value => this.props.employeeUpdate({ prop: 'username', value })
                            }
                        />
                        <Input
                            label='password'
                            placeholder='more than 8 character'
                            containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                            value={this.props.password}
                            onChangeText={
                                value => this.props.employeeUpdate({ prop: 'password', value })
                            }
                        />
                    </Card>
                    <View 
                        style={{
                            paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {this.renderError()}
                        <Button
                            loading={this.props.loading}
                            onPress={this.onButtonPress.bind(this)}
                            icon={
                                <Icon
                                name='arrow-right'
                                size={15}
                                color='white'
                                />
                            }
                            iconRight
                            title='เพิ่มพนักงาน'
                            buttonStyle={styles.buttonStyle}
                            containerStyle={{ marginTop: 20 }}
                            errorMessage={this.props.error}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    buttonStyle: {
        backgroundColor: blue500,
        width: 300,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5
    },
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    },
};

const mapStateToProps = (state) => {
    const { 
        eid, name, department, gitlab_id, address, email, tell, username, password, error, id_error, gitlab_id_error, loading
    } = state.employeeForm;
    return { 
        eid, name, department, gitlab_id, address, email, tell, username, password, error, id_error, gitlab_id_error, loading
    };
};

export default connect(mapStateToProps, { 
    employeeUpdate, employeeCreate, employeeReset
})(EmployeeCreate);
