import React from 'react';
import { Text, View } from 'react-native';

class AssessmentDisablePage extends React.Component {   
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>It's not time to assessment</Text>
        </View>
        );
    }
}

export default AssessmentDisablePage;
