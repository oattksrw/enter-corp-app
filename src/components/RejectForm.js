import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
// import { Confirm } from './common';
import {
    rejectUpdate, rejectCreate
} from '../actions';

class RejectForm extends Component {
    // state = { showModal: false };
    // componentWillMount() {
    //     console.log(this.props.assessmentActiveName);
    //     console.log(this.props.eid);
    // }
    
    onCommentChanged(text) {
        this.props.rejectUpdate({ prop: 'rejectMessage', value: text });
    }

    onButtonPress() {
        const { 
            rejectMessage,
            assessmentActiveName,
            eid
        } = this.props;
        this.props.rejectCreate({ 
            rejectMessage,
            assessmentActiveName,
            eid
        });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        return (
            <View 
                style={{
                    paddingTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
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
                    title='Create Assessment'
                    buttonStyle={{
                        backgroundColor: lightGreen500,
                        width: 300,
                        height: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                    onPress={this.onButtonPress.bind(this)}
                />
            </View>
        );
    }
 
    render() {
        return (
            <View style={{ paddingTop: 60 }}>
                <Card>
                    <Input
                        label='comment'
                        labelStyle={{
                            size: 30
                        }}
                        multiline
                        numberOfLines={4}
                        // inputContainerStyle={{
                        //     height: 
                        // }}
                        inputStyle={{
                            height: 100
                        }}
                        editable
                        maxLength={100}
                        placeholder='name of This Assessment'
                        containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                        onChangeText={this.onCommentChanged.bind(this)}
                        value={this.props.rejectMessage}
                    />
                    {this.renderError()}
                    {this.renderButton()}
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    },
};

const mapStateToProps = ({ rejectForm }) => {
    const {
        rejectMessage,
        loading
    } = rejectForm;
    return {
        rejectMessage,
        loading 
    };
};

export default connect(mapStateToProps, {
    rejectUpdate,
    rejectCreate
})(RejectForm);
