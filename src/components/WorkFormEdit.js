import React, { Component } from 'react';
// import firebase from 'firebase';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Card, Input } from 'react-native-elements';
import { workEditUpdate, workEditSave } from '../actions';

class WorkFormEdit extends Component {
    // renderNameError() {
    //     if (this.props.name_error) {
    //         return (
    //             <View style={{ backgroundColor: 'white' }}>
    //                 <Text style={styles.errorTextStyle}>
    //                     {this.props.name_error}
    //                 </Text>
    //             </View>
    //         );
    //     }
    // }

    // renderDepartmentError() {
    //     if (this.props.department_error) {
    //         return (
    //             <View style={{ backgroundColor: 'white' }}>
    //                 <Text style={styles.errorTextStyle}>
    //                     {this.props.department_error}
    //                 </Text>
    //             </View>
    //         );
    //     }
    // }
    
    render() {
        return (
        <View>
            <Card>
                <Text style={{ fontSize: 16 }}>RESULT</Text>
                <Input
                    placeholder='RESULT'
                    containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                    value={this.props.resultWork}
                    onChangeText={
                        value => this.props.workEditUpdate({ prop: 'resultWork', value })
                    }
                />
                {/* {this.renderNameError()} */}

        
                {/* <Text style={{ fontSize: 16 }}>Weight</Text>
                <Picker
                    style={{ width: '100%' }}
                    selectedValue={this.props.weightWork}
                    onValueChange={
                        value => this.props.workEditUpdate({ prop: 'weightWork', value })
                    }
                >
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                    <Picker.Item label='6' value='6' />
                    <Picker.Item label='7' value='7' />
                    <Picker.Item label='8' value='8' />
                    <Picker.Item label='9' value='9' />
                    <Picker.Item label='10' value='10' />
                    <Picker.Item label='11' value='11' />
                    <Picker.Item label='12' value='12' />
                    <Picker.Item label='13' value='13' />
                </Picker> */}
                <Text style={{ fontSize: 16 }}>Score</Text>
                <Picker
                    style={{ width: '100%' }}
                    selectedValue={this.props.scoreEmployeeWork}
                    onValueChange={
                        value => this.props.workEditUpdate({
                             prop: 'scoreEmployeeWork', value 
                            })
                    }
                >
                    <Picker.Item label='1' value='1' />
                    <Picker.Item label='2' value='2' />
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                </Picker>
            </Card>
        </View>
        );
    }
}

// const styles = {
//     errorTextStyle: {
//         fontSize: 16,
//         alignSelf: 'center',
//         color: 'red',
//         marginTop: 10
//     }
// };

const mapStateToProps = (state) => {
    const {
        assessmentActiveName,
        eid,
        uidProject,
        nameProject,
        uidWork,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork
    } = state.workEdit;
    return { 
        assessmentActiveName,
        eid,
        uidProject,
        nameProject,
        uidWork,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork
    };
};

export default connect(mapStateToProps, { 
    workEditUpdate, workEditSave
})(WorkFormEdit);
