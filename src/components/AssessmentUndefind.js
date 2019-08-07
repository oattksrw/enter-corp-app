import React from 'react';
import { Text, View } from 'react-native';

class AssessmentUndefind extends React.Component {   
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Your deparment not have assessment</Text>
        </View>
        );
    }
}

export default AssessmentUndefind;
