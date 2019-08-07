import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { 
  blue500
} from 'material-ui/styles/colors';
import AssessmentProcessList from './AssessmentProcessList';

class AssessmentMangerPage extends Component {
  onButtonPress() {
    Actions.assessmentManagerLoding({ type: 'reset' });
  }

  render() {
      return (
          <View style={{ paddingTop: 60 }}>
            <AssessmentProcessList />
            <View 
              style={{
                  paddingTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
              }}
            >
              <Button
                    icon={
                        <Icon
                        name='arrow-left'
                        size={15}
                        color='white'
                        />
                    }
                    title='Back'
                    iconLeft
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ marginTop: 20 }}
                    onPress={this.onButtonPress.bind(this)}
              />
            </View>
          </View>
      );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: blue500,
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  }
};

export default AssessmentMangerPage;
