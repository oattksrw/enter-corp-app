import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Card, CheckBox } from 'react-native-elements';
import { departmentUpdate, departmentCreate } from '../actions';

class DepartmentForm extends Component {

    onMondayChecked() {
        const checked = !this.convertStatusToBoolean(this.props.monStatus);
        if (checked) {
            const value = 'enable';
            this.props.departmentUpdate({ prop: 'monStatus', value });
        } else {
            const value = 'disable';
            this.props.departmentUpdate({ prop: 'monStatus', value });
        }
    }

    onTuesdayChecked() {
        const checked = !this.convertStatusToBoolean(this.props.tueStatus);
        if (checked) {
            const value = 'enable';
            this.props.departmentUpdate({ prop: 'tueStatus', value });
        } else {
            const value = 'disable';
            this.props.departmentUpdate({ prop: 'tueStatus', value });
        }
    }

    onWednesdayChecked() {
        const checked = !this.convertStatusToBoolean(this.props.wedStatus);
        if (checked) {
            const value = 'enable';
            this.props.departmentUpdate({ prop: 'wedStatus', value });
        } else {
            const value = 'disable';
            this.props.departmentUpdate({ prop: 'wedStatus', value });
        }
    }

    onThursdayChecked() {
        const checked = !this.convertStatusToBoolean(this.props.thuStatus);
        if (checked) {
            const value = 'enable';
            this.props.departmentUpdate({ prop: 'thuStatus', value });
        } else {
            const value = 'disable';
            this.props.departmentUpdate({ prop: 'thuStatus', value });
        }
    }

    onFridayChecked() {
        const checked = !this.convertStatusToBoolean(this.props.friStatus);
        if (checked) {
            const value = 'enable';
            this.props.departmentUpdate({ prop: 'friStatus', value });
        } else {
            const value = 'disable';
            this.props.departmentUpdate({ prop: 'friStatus', value });
        }
    }

    onSaturdayChecked() {
        const checked = !this.convertStatusToBoolean(this.props.satStatus);
        if (checked) {
            const value = 'enable';
            this.props.departmentUpdate({ prop: 'satStatus', value });
        } else {
            const value = 'disable';
            this.props.departmentUpdate({ prop: 'satStatus', value });
        }
    }

    onSundayChecked() {
        const checked = !this.convertStatusToBoolean(this.props.sunStatus);
        if (checked) {
            const value = 'enable';
            this.props.departmentUpdate({ prop: 'sunStatus', value });
        } else {
            const value = 'disable';
            this.props.departmentUpdate({ prop: 'sunStatus', value });
        }
    }

    convertStatusToBoolean(status) {
        switch (status) {
            case 'enable':
                return true;
            default:
                return false;
        }
    }

    MondayForm() {
        if (this.props.monStatus === 'enable') {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Start</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.monStart}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'monStart', value })
                        }
                    >
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='08:00' value='08:00' />   
                    </Picker>
                    <Text style={{ fontSize: 16 }}>End</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.monEnd}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'monEnd', value })
                        }
                    >
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='17:00' value='17:00' />
                    </Picker>
                </View>
            );
        }
    }

    TuesdayForm() {
        if (this.props.tueStatus === 'enable') {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Start</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.tueStart}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'tueStart', value })
                        }
                    >
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='08:00' value='08:00' />
                    </Picker>
                    <Text style={{ fontSize: 16 }}>End</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.tueEnd}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'tueEnd', value })
                        }
                    >
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='17:00' value='17:00' />
                    </Picker>
                </View>
            );
        }
    }

    WednesdayForm() {
        if (this.props.wedStatus === 'enable') {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Start</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.wedStart}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'wedStart', value })
                        }
                    >
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='08:00' value='08:00' />
                    </Picker>
                    <Text style={{ fontSize: 16 }}>End</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.wedEnd}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'wedEnd', value })
                        }
                    >
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='17:00' value='17:00' />
                    </Picker>
                </View>
            );
        }
    }

    ThursdayForm() {
        if (this.props.thuStatus === 'enable') {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Start</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.thuStart}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'thuStart', value })
                        }
                    >
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='08:00' value='08:00' />
                    </Picker>
                    <Text style={{ fontSize: 16 }}>End</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.thuEnd}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'thuEnd', value })
                        }
                    >
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='17:00' value='17:00' />
                    </Picker>
                </View>
            );
        }
    }

    FridayForm() {
        if (this.props.friStatus === 'enable') {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Start</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.friStart}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'friStart', value })
                        }
                    >
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='08:00' value='08:00' />
                    </Picker>
                    <Text style={{ fontSize: 16 }}>End</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.friEnd}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'friEnd', value })
                        }
                    >
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='17:00' value='17:00' />
                    </Picker>
                </View>
            );
        }
    }

    SaturdayForm() {
        if (this.props.satStatus === 'enable') {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Start</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.satStart}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'satStart', value })
                        }
                    >
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='08:00' value='08:00' />
                    </Picker>
                    <Text style={{ fontSize: 16 }}>End</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.satEnd}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'satEnd', value })
                        }
                    >
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='17:00' value='17:00' />
                    </Picker>
                </View>
            );
        }
    }

    SundayForm() {
        if (this.props.sunStatus === 'enable') {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Start</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.sunStart}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'sunStart', value })
                        }
                    >
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='08:00' value='08:00' />
                    </Picker>
                    <Text style={{ fontSize: 16 }}>End</Text>
                    <Picker
                        style={{ width: '100%' }}
                        selectedValue={this.props.sunEnd}
                        onValueChange={
                            value => this.props.departmentUpdate({ prop: 'sunEnd', value })
                        }
                    >
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='17:00' value='17:00' />
                    </Picker>
                </View>
            );
        }
    }

    render() {
        return (
        <View>
            <Card>
                <CheckBox
                    title='Monday'
                    onPress={this.onMondayChecked.bind(this)}
                    checked={this.props.monStatus === 'enable'}
                />
                {this.MondayForm()}
                <CheckBox
                    title='Tuesday'
                    onPress={this.onTuesdayChecked.bind(this)}
                    checked={this.props.tueStatus === 'enable'}
                />
                {this.TuesdayForm()}
                <CheckBox
                    title='Wednesday'
                    onPress={this.onWednesdayChecked.bind(this)}
                    checked={this.props.wedStatus === 'enable'}
                />
                {this.WednesdayForm()}
                <CheckBox
                    title='Thursday'
                    onPress={this.onThursdayChecked.bind(this)}
                    checked={this.props.thuStatus === 'enable'}
                />
                {this.ThursdayForm()}
                <CheckBox
                    title='Friday'
                    onPress={this.onFridayChecked.bind(this)}
                    checked={this.props.friStatus === 'enable'}
                />
                {this.FridayForm()}
                <CheckBox
                    title='Saturday'
                    onPress={this.onSaturdayChecked.bind(this)}
                    checked={this.props.satStatus === 'enable'}
                />
                {this.SaturdayForm()}
                <CheckBox
                    title='Sunday'
                    onPress={this.onSundayChecked.bind(this)}
                    checked={this.props.sunStatus === 'enable'}
                />
                {this.SundayForm()}
            </Card>
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
        sunEnd
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
        sunEnd
    };
};

export default connect(mapStateToProps, { 
    departmentUpdate, departmentCreate
})(DepartmentForm);
