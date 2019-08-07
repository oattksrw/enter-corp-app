import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import { opinionUpdate, opinionCreate } from '../actions';

class OpinionEmployeeForm extends Component {
    componentWillMount() {
        this.setPropsAssessmentActive();
        this.setPropsEmployeeID();
        this.fecthOpinion();
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
            self,
            team,
            manager,
            office,
            person,
            suggestion,
            assessmentActiveName,
            eid
        } = this.props;
        this.props.opinionCreate({ 
            self,
            team,
            manager,
            office,
            person,
            suggestion,
            assessmentActiveName,
            eid
        });
    }

    setPropsAssessmentActive() {
        firebase.database().ref('/assessments')
        .on('value', snapshot => {
            const value = (snapshot.val() && snapshot.val().active) || 'Anonymous';
            this.props.opinionUpdate({ prop: 'assessmentActiveName', value });
        });
    }

    setPropsEmployeeID() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
                const value = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
                this.props.opinionUpdate({ prop: 'eid', value });
            });
    }

    fecthOpinion() {
        firebase.database().ref('/assessments')
            .on('value', snapshot => {
                const active = (snapshot.val() && snapshot.val().active) || 'Anonymous';
                const { currentUser } = firebase.auth();
                firebase.database().ref(`/users/${currentUser.uid}`)
                    .on('value', snap => {
                    const eid = (snap.val() && snap.val().employee_id) || 'Anonymous';
                    firebase.database()
                        .ref(`/assessments/${active}/doing/${eid}/assessment/opinion`)
                        .on('value', sn => {
                    const self = (sn.val() && sn.val().self) || 'Anonymous';
                    const team = (sn.val() && sn.val().team) || 'Anonymous';
                    const manager = (sn.val() && sn.val().manager) || 'Anonymous';
                    const office = (sn.val() && sn.val().office) || 'Anonymous';
                    const person = (sn.val() && sn.val().person) || 'Anonymous';
                    // const suggestion = (sn.val() && sn.val().suggestion) || 'Anonymous';
                    let value = '';
                    if (self !== 'Anonymous') {
                        value = self;
                        this.props.opinionUpdate({ prop: 'self', value });
                    } 
                    if (team !== 'Anonymous') {
                        value = team;
                        this.props.opinionUpdate({ prop: 'team', value });
                    } 
                    if (manager !== 'Anonymous') {
                        value = manager;
                        this.props.opinionUpdate({ prop: 'manager', value });
                    }
                    if (office !== 'Anonymous') {
                        value = office;
                        this.props.opinionUpdate({ prop: 'office', value });
                    } 
                    if (person !== 'Anonymous') {
                        value = person;
                        this.props.opinionUpdate({ prop: 'person', value });
                    }
                    firebase.database()
                        .ref(`/assessments/${active}/doing/${eid}/assessment`)
                        .on('value', s => {
                            const suggestion = (s.val() && s.val().suggestion) || 'Anonymous';
                            if (suggestion !== 'Anonymous') {
                                value = suggestion;
                                this.props.opinionUpdate({ prop: 'suggestion', value });
                            }
                        });
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
                <Input
                    label='Self'
                    placeholder='Self'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.self}
                    onChangeText={
                        value => this.props.opinionUpdate({ prop: 'self', value })
                    }
                />
                {/* {this.renderNameError()} */}
                <Input
                    label='Team'
                    placeholder='Team'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.team}
                    onChangeText={
                        value => this.props.opinionUpdate({ prop: 'team', value })
                    }
                />
                <Input
                    label='Manager'
                    placeholder='Manager'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.manager}
                    onChangeText={
                        value => this.props.opinionUpdate({ prop: 'manager', value })
                    }
                />
                <Input
                    label='Office'
                    placeholder='Office'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.office}
                    onChangeText={
                        value => this.props.opinionUpdate({ prop: 'office', value })
                    }
                />
                <Input
                    label='Person'
                    placeholder='Person'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.person}
                    onChangeText={


                        value => this.props.opinionUpdate({ prop: 'person', value })
                    }
                />
                <Input
                    label='Suggestion'
                    placeholder='Suggestion'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.suggestion}
                    onChangeText={
                        value => this.props.opinionUpdate({ prop: 'suggestion', value })
                    }
                    multiline
                    numberOfLines={4}
                    inputStyle={{
                        height: 100
                    }}
                    editable
                    maxLength={100}
                />
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
        self,
        team,
        manager,
        office,
        person,
        assessmentActiveName,
        eid,
        suggestion,
        error
    } = state.opinionEmployeeForm;
    return { 
        self,
        team,
        manager,
        office,
        person,
        assessmentActiveName,
        eid,
        suggestion,
        error
    };
};

export default connect(mapStateToProps, { 
    opinionUpdate, opinionCreate
})(OpinionEmployeeForm);
