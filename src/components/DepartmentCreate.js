import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    blue500
} from 'material-ui/styles/colors';
import DepartmentForm from './DepartmentForm';
import { departmentUpdate, departmentCreate, departmentReset } from '../actions';

class DepartmentCreate extends Component {
    componentWillMount() {
        this.props.departmentReset();
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
        
        this.props.departmentCreate({ 
            name,
            monStatus: monStatus || 'disable',
            monStart: monStart || '09:00',
            monEnd: monEnd || '18:00',
            tueStatus: tueStatus || 'disable',
            tueStart: tueStart || '09:00',
            tueEnd: tueEnd || '18:00',
            wedStatus: wedStatus || 'disable',
            wedStart: wedStart || '09:00',
            wedEnd: wedEnd || '18:00',
            thuStatus: thuStatus || 'disable',
            thuStart: thuStart || '09:00',
            thuEnd: thuEnd || '18:00',
            friStatus: friStatus || 'disable',
            friStart: friStart || '09:00',
            friEnd: friEnd || '18:00',
            satStatus: satStatus || 'disable',
            satStart: satStart || '09:00',
            satEnd: satEnd || '18:00',
            sunStatus: sunStatus || 'disable',
            sunStart: sunStart || '09:00',
            sunEnd: sunEnd || '18:00'
        });
    }

    renderNameError() {
        if (this.props.name_error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.name_error}
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
                        <Text style={{ fontSize: 16 }}>name of department</Text>
                        <Input
                            placeholder='name department'
                            containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                            value={this.props.eid}
                            onChangeText={
                                value => this.props.departmentUpdate({ prop: 'name', value })
                            }
                        />
                        {this.renderNameError()}
                    </Card>
                    <DepartmentForm {...this.props} />
                    <View 
                        style={{
                            paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
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
                            title='Creat'
                            buttonStyle={styles.buttonStyle}
                            containerStyle={{ marginTop: 20 }}
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
        fontSize: 14,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    }
};

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
        name_error,
        loading
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
        name_error,
        loading
    };
};

export default connect(mapStateToProps, {
    departmentUpdate, departmentCreate, departmentReset
})(DepartmentCreate);
