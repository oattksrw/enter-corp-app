import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class AssessmentEmployeeeLoding extends React.Component {
    componentWillMount() {
        count = 0;
        countTwo = 0;
        countTree = 0;
        firebase.database().ref('/assessments')
            .on('value', snapshot => {
                const active = (snapshot.val() && snapshot.val().active) || 'Anonymous';
                this.renderPage(active);
            });
    }
    
    renderAssessmentPage(active) {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
                const eid = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
                firebase.database().ref(`/assessments/${active}/doing/${eid}`)
                .on('value', snap => {
                        const status = (snap.val() && snap.val().status) || 'Anonymous';
                        this.renderPageTwo(status);
                    });
            });
    }

    renderAssessmentDepartmentPage() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
                const eid = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
                firebase.database().ref(`/employees/${eid}`)
                .on('value', snap => {
                        const department = (snap.val() && snap.val().department) || 'Anonymous';
                        this.renderPageTree(department);
                    });
            });
    }

    renderPage(active) {
        count++;
        if (count === 1) {
            switch (active) {
                case 'disable':
                    return Actions.assessmentDisablePage({ type: 'reset' });
                default: return this.renderAssessmentPage(active);
            }
        }
    }
    
    renderPageTwo(status) {
        countTwo++;
        if (countTwo === 1) {
            switch (status) {
                case 'process':
                    return Actions.assessmentSended({ type: 'reset' });
                default: return this.renderAssessmentDepartmentPage();
            }
        }
    }

    renderPageTree(department) {
        countTree++;
        if (countTree === 1) {
            switch (department) {
                case 'Programmer':
                    return Actions.assessmentEmployeePage({ type: 'reset' });
                default: return Actions.assessmentUndefind({ type: 'reset' });
            }
        }
    }

    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Assessment Loding</Text>
        </View>
        );
    }
}

let count = 0;
let countTwo = 0;
let countTree = 0;

export default AssessmentEmployeeeLoding;
