import React from 'react';
import { View, ScrollView } from 'react-native';
import ImprovementEmployeeForm from './ImprovementEmployeeForm';

class AssessmentImprovementEmployeePage extends React.Component {
  render() {
    return (
      <View style={{ paddingTop: 60, paddingBottom: 60 }}>
        <ScrollView>
          <ImprovementEmployeeForm />
        </ScrollView>
      </View>
    );
  }
}

export default AssessmentImprovementEmployeePage;
