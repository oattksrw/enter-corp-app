import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import AssessmentEndButton from './AssessmentEndButton';

class AssessmentDepartmentList extends React.Component {
  onProgrammerPress() {
    Actions.assessmentMangerPage();
  }

  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <TouchableWithoutFeedback onPress={this.onProgrammerPress.bind(this)}>
          <ListItem
            title='Programmer'
            chevronColor="back"
            chevron
            bottomDivider
          />
        </TouchableWithoutFeedback>
        <AssessmentEndButton />
      </View>
    );
  }
}

export default AssessmentDepartmentList;
