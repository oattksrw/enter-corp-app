import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    blue500
} from 'material-ui/styles/colors';
import {
  assessmentDisable,
  assessmentCancle
} from '../actions';

class AssessmentEndButton extends Component {
    
    onDisablePress() {
        Alert.alert(
            'ปิดการประเมิน',
            'คุณแน่ใจหรือจะปิดการประเมิน',
            [
                { text: 'ยกเลิก', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { 
                    text: 'ตกลง',
                    onPress: () => {
                        this.props.assessmentDisable();
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    onCanclePress() {
        Alert.alert(
            'ยกเลิกการประเมิน',
            'คุณแน่ใจหรือจะยกเลิกการประเมิน',
            [
                { text: 'ยกเลิก', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { 
                    text: 'ตกลง',
                    onPress: () => {
                        this.props.assessmentCancle();
                    } 
                },
            ],
            { cancelable: false }
        );
    }

  renderDisableButton() {
      return (
          <Button
              loading={this.props.loading}
              icon={
                  <Icon
                  name='arrow-right'
                  size={15}
                  color='white'
                  />
              }
              iconRight
              title='ปิดการประเมิน'
              buttonStyle={{
                  backgroundColor: blue500,
                  width: 300,
                  height: 45,
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 5
              }}
              containerStyle={{ marginTop: 20 }}
              onPress={this.onDisablePress.bind(this)}
          />
      );
  }

  renderCancleButton() {
      return (
        <Button
            loading={this.props.loading}
            icon={
                <Icon
                name='arrow-right'
                size={15}
                color='white'
                />
            }
            iconRight
            title='ยกเลิกการประเมินนี้'
            buttonStyle={{
                backgroundColor: blue500,
                width: 300,
                height: 45,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5
            }}
            containerStyle={{ marginTop: 20 }}
            onPress={this.onCanclePress.bind(this)}
        />
      );
  }
 
  render() {
      return (
        <View 
            style={{
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {this.renderDisableButton()}
            {/* {this.renderCancleButton()} */}
        </View>
      );
  }
}

const mapStateToProps = ({ assessmentForm }) => {
    const {
        name,
        error,
        loading 
    } = assessmentForm;
    return {
        name,
        error,
        loading 
    };
};

export default connect(mapStateToProps, {
    assessmentDisable,
    assessmentCancle
})(AssessmentEndButton);
