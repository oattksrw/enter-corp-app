import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import { workProcessEditUpdate, workProcessEditCreate } from '../actions';

class WorkProcessEditForm extends Component {
    componentWillMount() {
        const assessmentActiveName = this.props.assessment_name;
        const eid = this.props.eID;
        const uidProject = this.props.project_id;
        const uidWork = this.props.work_id;
        const ref = firebase.database().ref(`assessments/${assessmentActiveName}/process/${eid}/assessment/projects/${uidProject}/works/${uidWork}`);
        ref.on('value', snapshot => {
            const score = (snapshot.val() && snapshot.val().score_of_manager) || 'Anonymous';
            this.props.workProcessEditUpdate({ prop: 'scoreManagerWork', value: score });
        });
        this.props.workProcessEditUpdate({ prop: 'assessmentActiveName', value: assessmentActiveName });
        this.props.workProcessEditUpdate({ prop: 'eid', value: eid });
        this.props.workProcessEditUpdate({ prop: 'uidProject', value: uidProject });
        this.props.workProcessEditUpdate({ prop: 'uidWork', value: uidWork });
    }
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
    onButtonPress() {
        const {
            assessmentActiveName,
            eid,
            uidProject,
            uidWork,
            scoreManagerWork
        } = this.props;
        
        this.props.workProcessEditCreate({ 
            assessmentActiveName,
            eid,
            uidProject,
            uidWork,
            scoreManagerWork: scoreManagerWork || '1'
        });
    }
    
    render() {
        return (
        <View>
            <Card>
                {/* {this.renderNameError()} */}
                <Text style={{ fontSize: 16 }}>Score</Text>
                <Picker
                    style={{ width: '100%' }}
                    selectedValue={this.props.scoreManagerWork}
                    onValueChange={
                        value => this.props.workProcessEditUpdate({
                             prop: 'scoreManagerWork', value 
                        })
                    }
                >
                    <Picker.Item label='1' value='1' />
                    <Picker.Item label='2' value='2' />
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                </Picker>
                <View 
                    style={{
                        paddingTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button
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
                        buttonStyle={styles.buttonStyle}
                        containerStyle={{ marginTop: 20 }}
                    />
                </View>
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
const styles = {
    buttonStyle: {
        backgroundColor: lightGreen500,
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
        assessmentActiveName,
        eid,
        uidProject,
        uidWork,
        scoreManagerWork
    } = state.workProcessEdit;
    return { 
        assessmentActiveName,
        eid,
        uidProject,
        uidWork,
        scoreManagerWork
    };
};

export default connect(mapStateToProps, { 
    workProcessEditUpdate, workProcessEditCreate
})(WorkProcessEditForm);
