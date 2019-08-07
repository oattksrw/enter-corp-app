import React from 'react';
import firebase from 'firebase';
import { View, TouchableWithoutFeedback, Alert, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { 
    blue500
} from 'material-ui/styles/colors';
import { assessmentListUpdate, assessmentSentToManager } from '../actions';

class AssessmentRepository extends React.Component {
    componentWillMount() {
        count1 = 0;
        count2 = 0;
        count3 = 0;
        this.props.assessmentListUpdate({ prop: 'error', value: '' });
        this.props.assessmentListUpdate({ prop: 'loading', value: false });
        this.props.assessmentListUpdate({ prop: 'projectChecked', value: false });
        this.props.assessmentListUpdate({ prop: 'improvementChecked', value: false });
        this.props.assessmentListUpdate({ prop: 'opinionChecked', value: false });
        this.props.assessmentListUpdate({ prop: 'suggestionChecked', value: false });
        this.setPropsAssessmentActive();
        this.setPropsEmployeeID();
        setTimeout(() => {
            this.checkProject();
        }, 500);
        setTimeout(() => {
            this.checkImprovment();
        }, 500);
        setTimeout(() => {
            this.checkOpinion();
        }, 500);
        setTimeout(() => {
            this.checkSuggestion();
        }, 500);
        setTimeout(() => {
            this.findReject();
        }, 500);
    }


    onProjectPress() {
        Actions.assessmentProjectEmployeePage();
    }

    onImprovementPress() {
        Actions.assessmentImprovementEmployeePage();
    }

    onOpinionPress() {
        Actions.assessmentOpinionEmployeePage();
    }

    onSuggestionPress() {
        Actions.assessmentSuggestionEmployeePage();
    }

    onButtonPress() {
        Alert.alert(
            'Send to manager',
            'Are you sure to send your assessment?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { 
                    text: 'OK',
                    onPress: () => {
                        if (
                            this.props.projectChecked && 
                            this.props.improvementChecked &&
                            this.props.opinionChecked &&
                            this.props.suggestionChecked
                        ) {
                            this.props.assessmentListUpdate({ prop: 'loading', value: true });
                            const {
                                assessmentActiveName,
                                eid
                            } = this.props;
                            this.props.assessmentSentToManager({
                                assessmentActiveName,
                                eid
                            });
                        } else {
                            this.props.assessmentListUpdate({ prop: 'error', value: 'not done' });
                            this.props.assessmentListUpdate({ prop: 'loading', value: false });
                        }
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
            this.props.assessmentListUpdate({ prop: 'assessmentActiveName', value });
        });
    }

    setPropsEmployeeID() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
                const value = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
                this.props.assessmentListUpdate({ prop: 'eid', value });
            });
    }

    findReject() {
        const active = this.props.assessmentActiveName;
        const eid = this.props.eid;
        const ref = firebase.database().ref(`/assessments/${active}/doing/${eid}`);
        ref.on('value', snapshot => {
            const data = snapshot.val() || 'Anonymous';
            if (data.status === 'reject') {
                const status = true;
                this.props.assessmentListUpdate({ prop: 'status', value: status });
                this.props.assessmentListUpdate({ prop: 'comment', value: data.comment });
            }
        });
    }

    checkProject() {
        // const assessmentActiveName = this.props.assessmentActiveName;
        const eid = this.props.eid;
        const refEid = firebase.database().ref(`/employees/${eid}`);
        if (count1 === 0) {
        count1++;
        refEid.on('value', snapshot => {
            const gitlabID = (snapshot.val() && snapshot.val().gitlab_id) || 'Anonymous';
            const refProject = firebase.database().ref(`/gitlab_id/${gitlabID}/projects`);
            if (count2 === 0) {
            count2++;
            refProject.on('value', snap => { 
                const allStatus = [];
                const allName = [];
                snap.forEach(status => {
                    allStatus.push(status.child('status').val());
                    allName.push(status.child('name').val());
                });
                let checkProjectSuccess = true;
                for (let i = 0; i < allStatus.length; i++) {
                    if (allStatus[i] === 'has not been used') {
                        checkProjectSuccess = false;
                        break;
                    }
                }
                
                if (checkProjectSuccess) {
                    let checkWorkSuccess = true;
                    for (let i = 0; i < allName.length; i++) {
                        const refWork = firebase.database().ref(`/gitlab_id/${gitlabID}/projects/${allName[i]}/works`);
                        if (count3 === 0) {
                        count3++;
                        refWork.on('value', sn => {          
                            const allStatusWork = [];
                            sn.forEach(status => {
                                allStatusWork.push(status.child('status').val());
                            });
                            for (let j = 0; j < allStatusWork.length; j++) {
                                if (allStatusWork[j] === 'has not been used') {
                                    checkWorkSuccess = false;
                                    break;
                                }
                            }
                        });
                        }
                    }
                    if (checkWorkSuccess) {
                        const value = true;
                        this.props.assessmentListUpdate({ prop: 'projectChecked', value });
                    }
                }
            });
            }
        });
        }
    }

    checkImprovment() {
        const assessmentActiveName = this.props.assessmentActiveName;
        const eid = this.props.eid;
        firebase.database()
        .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment/improvement`)
        .on('value', snapshot => {
            const data = (snapshot.val() && snapshot.val()) || 'Anonymous';
            if (data !== 'Anonymous') {
                const value = true;
                this.props.assessmentListUpdate({ prop: 'improvementChecked', value });
            }
        });
    }

    checkOpinion() {
        const assessmentActiveName = this.props.assessmentActiveName;
        const eid = this.props.eid;
        firebase.database()
        .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment/opinion`)
        .on('value', snapshot => {
            const data = (snapshot.val() && snapshot.val()) || 'Anonymous';
            if (data !== 'Anonymous') {
                const value = true;
                this.props.assessmentListUpdate({ prop: 'opinionChecked', value });
            }
        });
    }

    checkSuggestion() {
        const assessmentActiveName = this.props.assessmentActiveName;
        const eid = this.props.eid;
        firebase.database()
        .ref(`/assessments/${assessmentActiveName}/doing/${eid}/assessment`)
        .on('value', snapshot => {
            const data = (snapshot.val() && snapshot.val().suggestion) || 'Anonymous';
            if (data !== 'Anonymous') {
                const value = true;
                this.props.assessmentListUpdate({ prop: 'suggestionChecked', value });
            }
        });
    }

    renderIconProjectChecked() {
        if (this.props.projectChecked) {
            return (
                <Icon
                    name='check'
                    size={15}
                    color='green'
                />
            );
        }
    }

    renderIconImprovementChecked() {
        if (this.props.improvementChecked) {
            return (
                <Icon
                    name='check'
                    size={15}
                    color='green'
                />
            );
        }
    }

    renderIconOpinionChecked() {
        if (this.props.opinionChecked && this.props.suggestionChecked) {
            return (
                <Icon
                    name='check'
                    size={15}
                    color='green'
                />
            );
        }
    }

    renderIconSuggestionChecked() {
        if (this.props.suggestionChecked) {
            return (
                <Icon
                    name='check'
                    size={15}
                    color='green'
                />
            );
        }
    }

    renderButton() {
        return (
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
                    title='ส่งแบบประเมิน'
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ marginTop: 20 }}
                />
            </View>
        );
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

    renderComment() {
        if (this.props.status) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.comment}
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
        <View>
            <TouchableWithoutFeedback 
                onPress={this.onProjectPress.bind(this)} 
            >
                <ListItem
                    title='Job'
                    leftIcon={this.renderIconProjectChecked()}
                    chevronColor="back"
                    chevron
                    bottomDivider
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onOpinionPress.bind(this)}>
                <ListItem
                    title='Opinion'
                    leftIcon={this.renderIconOpinionChecked()}
                    chevronColor="back"
                    chevron
                    bottomDivider
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onImprovementPress.bind(this)}>
                <ListItem
                    title='Commitment'
                    leftIcon={this.renderIconImprovementChecked()}
                    chevronColor="back"
                    chevron
                    bottomDivider
                />
            </TouchableWithoutFeedback>
            {/* <TouchableWithoutFeedback onPress={this.onSuggestionPress.bind(this)}>
                <ListItem
                    title='Suggestion'
                    leftIcon={this.renderIconSuggestionChecked()}
                    chevronColor="back"
                    chevron
                    bottomDivider
                />
            </TouchableWithoutFeedback> */}
            {this.renderComment()}
            {this.renderError()}
            {this.renderButton()}
        </View>
        );
    }
}

let count1 = 0;
let count2 = 0;
let count3 = 0;

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
        projectChecked,
        improvementChecked,
        opinionChecked,
        suggestionChecked,
        assessmentActiveName,
        status,
        comment,
        eid,
        loading,
        error
    } = state.assessmentListEmployee;
    
    return { 
        projectChecked,
        improvementChecked,
        opinionChecked,
        suggestionChecked,
        assessmentActiveName,
        status,
        comment,
        eid,
        loading,
        error
    };
};

export default connect(mapStateToProps, { 
    assessmentListUpdate, assessmentSentToManager
})(AssessmentRepository);
