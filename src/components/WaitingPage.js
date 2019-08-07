import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
// import axios from 'axios';

class WaitingPage extends React.Component {
  componentWillMount() {
    // axios.get('http://10.0.2.2:3000/test')
    //   .then(response => console.log(response));
    // count = 1
    // Actions.auth();
    // console.log('HELLO++');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref(`/users/${userId}`)
        .once('value').then((snapshot) => {
          const typeUser = (snapshot.val() && snapshot.val().type) || 'Anonymous';
          this.renderPage(typeUser);
        });
        countAuth++;
      } else {
          if (countAuth === 0) {
            countAuth++;
            return Actions.auth();
          }
          return 0;
      }
    });
  }

  renderPage(typeUser) {
    count++;
    if (count === 1) {
      console.log('RUN PAGE AUTO');   
      switch (typeUser) {
        case 'employee':
            return Actions.employeeMain();
        case 'manager':
            return Actions.managerMain();
        default: return Actions.anotherMain();
      }
    } else {
      console.log('NOT RUN PAGE AUTO');
    }
  }
  render() {
    countAuth = 0;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ENTER CORPORATION</Text>
      </View>
    );
  }
}

let count = 0;
let countAuth = 0;

export default WaitingPage;
