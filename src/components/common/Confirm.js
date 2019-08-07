// manager/src/components/common/Confirm.js
import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { 
  lightBlue500,
  lightBlue400,
  black
} from 'material-ui/styles/colors';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardStyle, buttonStyle } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType={'slide'}
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <Card style={cardStyle}>
          <Text style={textStyle}>{children}</Text>
          <Button
            onPress={onAccept}
            text='Yes'
            buttonStyle={buttonStyle}
            containerStyle={{ marginTop: 20 }}
          />
          <Button
            onPress={onDecline}
            text='No'
            buttonStyle={buttonStyle}
            containerStyle={{ marginTop: 20 }}
          />
          {/* <Button onPress={onAccept}>Yes</Button>
          <Button onPress={onDecline}>No</Button> */}
        </Card>
      </View>
    </Modal>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: lightBlue400,
    width: 300,
    height: 45,
    borderColor: lightBlue500,
    borderWidth: 2,
    borderRadius: 5
  },
  cardStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    color: black
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { Confirm };
