import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class AssessmentManagerLoding extends React.Component {
  componentWillMount() {
    count = 0;
    firebase.database().ref('/assessments')
        .on('value', snapshot => {
            const active = (snapshot.val() && snapshot.val().active) || 'Anonymous';
            this.renderPage(active);
        });
  }

  renderPage(active) {
      count++;
      if (count === 1) {
        switch (active) {
          case 'disable':
              return Actions.assessmentCreate({ type: 'reset' });
          default: return Actions.assessmentDepartmentList({ type: 'reset' });
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

export default AssessmentManagerLoding;
