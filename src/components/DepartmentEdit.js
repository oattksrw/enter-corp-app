import _ from 'lodash';
import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    blue500
} from 'material-ui/styles/colors';
import DepartmentForm from './DepartmentForm';
import { departmentUpdate, departmentSave, departmentDelete } from '../actions';

class DepartmentEdit extends Component {
    componentWillMount() {
        // console.log(this.props.department);
        // console.log(this.jsonToProp);
        
        _.each(this.jsonToProp, (value, prop) => {
          this.props.departmentUpdate({ prop, value });
        });
    }
    
    onButtonPress() {
        const { 
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
        } = this.props;
        
        this.props.departmentSave({ 
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
                        const { name } = this.props.department;
                        this.props.departmentDelete({ name });
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    jsonToProp = {
        name: this.props.department.name,
        monStatus: this.props.department.datetime.mon.status,
        monStart: this.props.department.datetime.mon.start,
        monEnd: this.props.department.datetime.mon.end,
        tueStatus: this.props.department.datetime.tue.status,
        tueStart: this.props.department.datetime.tue.start,
        tueEnd: this.props.department.datetime.tue.end,
        wedStatus: this.props.department.datetime.wed.status,
        wedStart: this.props.department.datetime.wed.start,
        wedEnd: this.props.department.datetime.wed.end,
        thuStatus: this.props.department.datetime.thu.status,
        thuStart: this.props.department.datetime.thu.start,
        thuEnd: this.props.department.datetime.thu.end,
        friStatus: this.props.department.datetime.fri.status,
        friStart: this.props.department.datetime.fri.start,
        friEnd: this.props.department.datetime.fri.end,
        satStatus: this.props.department.datetime.sat.status,
        satStart: this.props.department.datetime.sat.start,
        satEnd: this.props.department.datetime.sat.end,
        sunStatus: this.props.department.datetime.sun.status,
        sunStart: this.props.department.datetime.sun.start,
        sunEnd: this.props.department.datetime.sun.end
    }

    render() {
        return (
            <View>
                <ScrollView contentContainerStyle={{ paddingVertical: 60 }}>
                    <DepartmentForm />
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
                        title='Save'
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
                        title='Fire Department'
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
        sunEnd,
        saveLoading,
        deleteLoading
    } = state.departmentForm;

    return {
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
        sunEnd,
        saveLoading,
        deleteLoading
    };
};

export default connect(mapStateToProps, { 
    departmentUpdate, departmentSave, departmentDelete
})(DepartmentEdit);
