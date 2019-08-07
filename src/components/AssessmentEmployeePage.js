import React from 'react';
import { View } from 'react-native';
import AssessmentRepository from './AssessmentRepository';

class AssessmentEmployeePage extends React.Component {   
    render() {
        return (
        <View style={{ paddingTop: 60 }}>
            <AssessmentRepository />
        </View>
        );
    }
}

export default AssessmentEmployeePage;
