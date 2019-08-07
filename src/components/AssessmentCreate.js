import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
// import { Confirm } from './common';
import {
    assessmentNameChanged, assessmentCreate, assessmentReset
} from '../actions';

class AssessmentCreate extends Component {
    // state = { showModal: false };
    componentWillMount() {
        this.props.assessmentReset();
    }
    onNameChanged(text) {
        this.props.assessmentNameChanged(text);
    }

    onButtonPress() {
        const { name } = this.props;
        this.props.assessmentCreate({ name });
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
    assessmentNameChanged,
    assessmentCreate,
    assessmentReset
})(AssessmentCreate);
