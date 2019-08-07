import React, { Component } from 'react';
// import firebase from 'firebase';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Card, Input } from 'react-native-elements';
import DepartmentSelect from './DepartmentSelect';
import { employeeUpdate, employeeCreate } from '../actions';

class EmployeeForm extends Component {

    findDepartment() {
        return (
            <DepartmentSelect />
        );
    }
    
    render() {
        return (
        <View>
            <Card>
                <Input
                    label='Name'
                    placeholder='firstname lastname'
                    containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                    value={this.props.name}
                    onChangeText={
                        value => this.props.employeeUpdate({ prop: 'name', value })
                    }
                    maxLength={20}
                    errorMessage={this.props.name_error}
                />
                <Input
                    label='Department'
                    placeholder='ex. Programmer'
                    containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                    value={this.props.department}
                    onChangeText={
                        value => this.props.employeeUpdate({ prop: 'department', value })
                    }
                    editable={false}
                    selectTextOnFocus={false}
                    containerStyle={{
                        alignSelf: 'center',
                        // backgroundColor: '#f0f0f5'
                    }}
                    maxLength={20}
                    errorMessage={this.props.department_error}
                />
                {this.findDepartment()}
                <Input
                    label='Gitlab ID'
                    placeholder='ex. 40'
                    containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                    value={this.props.gitlab_id}
                    onChangeText={
                        value => this.props.employeeUpdate({ prop: 'gitlab_id', value })
                    }
                    maxLength={6}
                    errorMessage={this.props.gitlab_id_error}
                />
                <Text style={{ fontSize: 16 }}>Gen</Text>
                <Picker
                    style={{ width: '100%' }}
                    selectedValue={this.props.gen}
                    onValueChange={
                        value => this.props.employeeUpdate({ prop: 'gen', value })
                    }
                >
                    <Picker.Item label='Male' value='male' />
                    <Picker.Item label='Female' value='female' />
                </Picker>
                {/* <Input
                    label='Address'
                    placeholder='address'
                    containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                    value={this.props.address}
                    onChangeText={
                        value => this.props.employeeUpdate({ prop: 'address', value })
                    }
                />
                <Input
                    label='Email'
                    placeholder='email@domain.com'
                    containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                    value={this.props.email}
                    onChangeText={
                        value => this.props.employeeUpdate({ prop: 'email', value })
                    }
                />

                <Input
                    label='Tellephone Number'
                    placeholder='ex. 0999999999'
                    containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                    value={this.props.tell}
                    onChangeText={
                        value => this.props.employeeUpdate({ prop: 'tell', value })
                    }
                /> */}
            </Card>
        </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        eid,
        name,
        department,
        gitlab_id,
        gen,
        address,
        email,
        tell,
        username,
        password,
        error, 
        name_error,
        department_error,
        gitlab_id_error
    } = state.employeeForm;
    return { 
        eid,
        name,
        department,
        gitlab_id,
        gen,
        address,
        email,
        tell,
        username,
        password,
        error,
        name_error,
        department_error,
        gitlab_id_error 
    };
};

export default connect(mapStateToProps, { 
    employeeUpdate, employeeCreate
})(EmployeeForm);
