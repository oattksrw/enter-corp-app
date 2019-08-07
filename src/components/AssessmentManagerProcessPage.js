import React, { Component } from 'react';
import firebase from 'firebase';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { 
    blue500
} from 'material-ui/styles/colors';
// import AssessmentListProjectEmployeeSelect from './AssessmentListProjectEmployeeSelect';
// import AssessmentListProjectEmployee from './AssessmentListProjectEmployee';
// import AssessmentListProjectEmployeeAdditional from './AssessmentListProjectEmployeeAdditional';
import { processAssessmentUpdate, approveAssessment } from '../actions';

class AssessmentManagerProcessPage extends Component {
    componentWillMount() {
            // console.log(this.props.assessmentProcess);
            this.setPropsAssessmentActive();
            this.setPropsEmployeeID();
    }
    // onButtonPress() {
    //     Actions.assessmentEmployeePage({ type: 'reset' });
    // }

    onProjectPress() {
        // const dataProcess = this.props.assessmentProcess;
        // console.log(this.props.assessmentProcess);
        Actions.projectMainPage({ 
            assessmentProcess: this.props.assessmentProcess,
            assessmentName: this.props.assessmentActiveName,
            eID: this.props.eid
        });
    }
    onImprovementPress() {
        const dataProcess = this.props.assessmentProcess;
        Actions.improvementPage({ improvement: dataProcess.assessment.improvement });
    }
    onOpinionPress() {
        const dataProcess = this.props.assessmentProcess;
        Actions.opinionPage({ 
            opinion: dataProcess.assessment.opinion,
            suggestion: dataProcess.assessment.suggestion 
        });
    }
    onSuggestionPress() {
        const dataProcess = this.props.assessmentProcess;
        Actions.suggestionPage({ suggestion: dataProcess.assessment.suggestion });
    }

    onApproveButtonPress() {
        Alert.alert(
            'DELETE',
            'Are you sure to approve this assessment?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { 
                    text: 'OK',
                    onPress: () => {
                        this.props.approveAssessment({
                            assessmentActiveName: this.props.assessmentActiveName,
                            eid: this.props.eid,
                        });
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    onRejectPress() {
        Alert.alert(
            'DELETE',
            'Are you sure to reject this assessment?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { 
                    text: 'OK',
                    onPress: () => {
                        // this.props.approveAssessment({
                        //     assessmentActiveName: this.props.assessmentActiveName,
                        //     eid: this.props.eid
                        // });
                        Actions.rejectForm({
                            assessmentActiveName: this.props.assessmentActiveName,
                            eid: this.props.eid
                        });
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    setPropsAssessmentActive() {
        firebase.database().ref('/assessments')
        .on('value', snapshot => {
            const value = (snapshot.val() && snapshot.val().active) || 'Anonymous';
            this.props.processAssessmentUpdate({ prop: 'assessmentActiveName', value });
        });
    }

    setPropsEmployeeID() {
        this.props.processAssessmentUpdate({ prop: 'eid', value: this.props.assessmentProcess.uid });
    }

    renderApproveButton() {
        return (
            <Button
                onPress={this.onApproveButtonPress.bind(this)}
                icon={
                    <Icon
                    name='arrow-right'
                    size={15}
                    color='white'
                    />
                }
                iconRight
                title='Approve'
                buttonStyle={styles.buttonStyle}
                containerStyle={{ marginTop: 20 }}
            />
        );
    }

    renderRejectButton() {
        return (
            <Button
                onPress={this.onRejectPress.bind(this)}
                icon={
                    <Icon
                    name='arrow-right'
                    size={15}
                    color='white'
                    />
                }
                iconRight
                title='Reject'
                buttonStyle={styles.buttonStyle}
                containerStyle={{ marginTop: 20 }}
            />
        );
    }

    render() {
        // console.log(this.props.assessmentActiveName);
        // console.log(this.props.eid);
        return (
            <View style={{ paddingTop: 60 }}>
                <TouchableWithoutFeedback 
                    onPress={this.onProjectPress.bind(this)} 
                >
                    <ListItem
                        title='Project'
                        chevronColor="back"
                        chevron
                        bottomDivider
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onOpinionPress.bind(this)}>
                    <ListItem
                        title='Opinion'
                        chevronColor="back"
                        chevron
                        bottomDivider
                    />
                </TouchableWithoutFeedback>
                {/* <TouchableWithoutFeedback onPress={this.onSuggestionPress.bind(this)}>
                    <ListItem
                        title='Suggestion'
                        chevronColor="back"
                        chevron
                        bottomDivider
                    />
                </TouchableWithoutFeedback> */}
                <TouchableWithoutFeedback onPress={this.onImprovementPress.bind(this)}>
                    <ListItem
                        title='Commitment'
                        chevronColor="back"
                        chevron
                        bottomDivider
                    />
                </TouchableWithoutFeedback>
                <View 
                    style={{
                        paddingTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {this.renderApproveButton()}
                    {this.renderRejectButton()}
                </View>
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
  }
};

const mapStateToProps = (state) => {
    const { 
        assessmentActiveName,
        eid

    } = state.processAssessment;
    return {
        assessmentActiveName,
        eid
    };
};

export default connect(mapStateToProps, { 
    processAssessmentUpdate, approveAssessment
})(AssessmentManagerProcessPage);
