import _ from 'lodash';
import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    blue500
} from 'material-ui/styles/colors';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';

class EmployeeEdit extends Component {
    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
          this.props.employeeUpdate({ prop, value });
        });
    }
    
    onButtonPress() {
        const { 
            name, 
            department, 
            gitlab_id, 
            gen, 
            // address, 
            // email, 
            // tell 
        } = this.props;
        this.props.employeeSave({ 
            name, 
            department, 
            gitlab_id, 
            gen, 
            // address, 
            // email, 
            // tell, 
            uid: this.props.employee.uid 
        });
    }

    onFirePress() {
        Alert.alert(
            'DELETE',
            'Are you sure to delete',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { 
                    text: 'OK',
                    onPress: () => {
                        const { uid } = this.props.employee;
                        this.props.employeeDelete({ uid });
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        return (
        <View>
            <ScrollView contentContainerStyle={{ paddingVertical: 60 }}>
                <EmployeeForm />
                <View 
                        style={{
                            paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                >
                <Button
                    loading={this.props.saveLoading}
                    onPress={this.onButtonPress.bind(this)}
                    icon={
                        <Icon
                        name='arrow-right'
                        size={15}
                        color='white'
                        />
                    }
                    iconRight
                    title='บันทึก'
                    buttonStyle={{
                        backgroundColor: blue500,
                        width: 300,
                        height: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                />

                <Button
                    loading={this.props.deleteLoading}
                    onPress={this.onFirePress.bind(this)}
                    icon={
                        <Icon
                        name='arrow-right'
                        size={15}
                        color='white'
                        />
                    }
                    iconRight
                    title='ลบพนักงาน'
                    buttonStyle={{
                        backgroundColor: blue500,
                        width: 300,
                        height: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                />
                </View>
            </ScrollView>
        </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        eid, name, department, gitlab_id, gen, address, email, tell, username, password, saveLoading, deleteLoading
    } = state.employeeForm;
    return { eid, name, department, gitlab_id, gen, address, email, tell, username, password, saveLoading, deleteLoading };
};
   
export default connect(
    mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
