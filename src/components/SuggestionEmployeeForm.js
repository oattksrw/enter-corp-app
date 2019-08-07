import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import { suggestionUpdate, suggestionCreate } from '../actions';

class SuggestionEmployeeForm extends Component {
    componentWillMount() {
        this.setPropsAssessmentActive();
        this.setPropsEmployeeID();
        this.fecthSuggestion();
    }

    // renderNameError() {
    //     if (this.props.name_error) {
    //         return (
    //             <View style={{ backgroundColor: 'white' }}>
    //                 <Text style={styles.errorTextStyle}>
    //                     {this.props.name_error}
    //                 </Text>
    //             </View>
    //         );
    //     }
    // }

    onButtonPress() {
        const { 
            suggestion,
            assessmentActiveName,
            eid
        } = this.props;
        
        this.props.suggestionCreate({ 
            suggestion,
            assessmentActiveName,
            eid
        });
    }
    setPropsAssessmentActive() {
        firebase.database().ref('/assessments')
        .on('value', snapshot => {
            const value = (snapshot.val() && snapshot.val().active) || 'Anonymous';
            this.props.suggestionUpdate({ prop: 'assessmentActiveName', value });
        });
    }

    setPropsEmployeeID() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
                const value = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
                this.props.suggestionUpdate({ prop: 'eid', value });
            });
    }

    fecthSuggestion() {
        firebase.database().ref('/assessments')
            .on('value', snapshot => {
                const active = (snapshot.val() && snapshot.val().active) || 'Anonymous';
                const { currentUser } = firebase.auth();
                firebase.database().ref(`/users/${currentUser.uid}`)
                    .on('value', snap => {
                    const eid = (snap.val() && snap.val().employee_id) || 'Anonymous';
                    firebase.database()
                        .ref(`/assessments/${active}/doing/${eid}/assessment`)
                        .on('value', sn => {
                    const suggestion = (sn.val() && sn.val().suggestion) || 'Anonymous';
                    let value = '';
                    if (suggestion !== 'Anonymous') {
                        value = suggestion;
                        this.props.suggestionUpdate({ prop: 'suggestion', value });
                    }
                });
            });
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

    render() {
        return (
        <View>
            <Card>
                <Text style={{ fontSize: 16, marginTop: 16 }}>Suggestion</Text>
                <Input
                    placeholder='Suggestion'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.suggestion}
                    onChangeText={
                        value => this.props.suggestionUpdate({ prop: 'suggestion', value })
                    }
                    multiline
                    numberOfLines={4}
                    inputStyle={{
                        height: 100
                    }}
                    editable
                    maxLength={100}
                />
                {/* {this.renderNameError()} */}
                <View 
                    style={{
                        paddingTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {this.renderError()}
                    <Button
                        onPress={this.onButtonPress.bind(this)}
                        icon={
                            <Icon
                            name='arrow-right'
                            size={15}
                            color='white'
                            />
                        }
                        iconRight
                        title='Save'
                        buttonStyle={styles.buttonStyle}
                        containerStyle={{ marginTop: 20 }}
                    />
                </View>
            </Card>
        </View>
        );
    }
}

const styles = {
    buttonStyle: {
        backgroundColor: lightGreen500,
        width: 300,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5
    },
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    }
};

const mapStateToProps = (state) => {
    const { 
        suggestion,
        assessmentActiveName,
        eid,
        error
    } = state.suggestionEmployeeForm;
    
    return { 
        suggestion,
        assessmentActiveName,
        eid,
        error
    };
};

export default connect(mapStateToProps, { 
    suggestionUpdate, suggestionCreate
})(SuggestionEmployeeForm);

