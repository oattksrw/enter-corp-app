import React from 'react';
import { View } from 'react-native';
import SuggestionEmployeeForm from './SuggestionEmployeeForm';

class AssessmentSuggestionEmployeePage extends React.Component {
  render() {
    return (
      <View style={{ paddingTop: 60, paddingBottom: 60 }}>
        <SuggestionEmployeeForm />
      </View>
    );
  }
}

export default AssessmentSuggestionEmployeePage;
