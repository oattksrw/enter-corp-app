import React from 'react';
import { View, ScrollView } from 'react-native';
import OpinionEmployeeForm from './OpinionEmployeeForm';

class AssessmentOpinionEmployeePage extends React.Component {
  render() {
    return (
      <View style={{ paddingTop: 60, paddingBottom: 60 }}>
        <ScrollView>
          <OpinionEmployeeForm />
        </ScrollView>
      </View>
    );
  }
}

export default AssessmentOpinionEmployeePage;
