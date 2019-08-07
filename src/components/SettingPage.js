import React from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import { logoutUser } from '../actions';

class SettingPage extends React.Component {
  onLogoutPress() {
    Alert.alert(
      'log out',
      'Are you sure to log out',
      [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { 
              text: 'OK',
              onPress: () => {
                logoutUser();
              } 
          },
      ],
      { cancelable: false }
    );
  }

  onChangePasswordPress() {
    Actions.changePasswordPage();
  }

  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <TouchableWithoutFeedback onPress={this.onLogoutPress.bind(this)}>
          <ListItem
            title='Sign Out'
            chevronColor="back"
            chevron
            bottomDivider
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onChangePasswordPress.bind(this)}>
          <ListItem
            title='Change Password'
            chevronColor="back"
            chevron
            bottomDivider
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default SettingPage;
