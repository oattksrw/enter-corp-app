import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import { improvementUpdate, improvementCreate } from '../actions';

class ImprovementEmployeeForm extends Component {
    componentWillMount() {
        this.setPropsAssessmentActive();
        this.setPropsEmployeeID();
        this.fecthImprovement();
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
            activity,
            target,
            result,
            assessmentActiveName,
            eid
        } = this.props;
        // console.log({ 
        //     activity,
        //     target,
        //     result
        // });
        
        this.props.improvementCreate({ 
            activity,
            target,
            result,
            assessmentActiveName,
            eid
        });
    }

    setPropsAssessmentActive() {
        firebase.database().ref('/assessments')
        .on('value', snapshot => {
            const value = (snapshot.val() && snapshot.val().active) || 'Anonymous';
            this.props.improvementUpdate({ prop: 'assessmentActiveName', value });
        });
    }

    setPropsEmployeeID() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
                const value = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
                this.props.improvementUpdate({ prop: 'eid', value });
            });
    }

    fecthImprovement() {
        firebase.database().ref('/assessments')
            .on('value', snapshot => {
                const active = (snapshot.val() && snapshot.val().active) || 'Anonymous';
                const { currentUser } = firebase.auth();
                firebase.database().ref(`/users/${currentUser.uid}`)
                    .on('value', snap => {
                    const eid = (snap.val() && snap.val().employee_id) || 'Anonymous';
                    firebase.database()
                        .ref(`/assessments/${active}/doing/${eid}/assessment/improvement`)
                        .on('value', sn => {
                    const activity = (sn.val() && sn.val().activity) || 'Anonymous';
                    const target = (sn.val() && sn.val().target) || 'Anonymous';
                    const result = (sn.val() && sn.val().result) || 'Anonymous';
                    let value = '';
                    if (activity !== 'Anonymous') {
                        value = activity;
                        this.props.improvementUpdate({ prop: 'activity', value });
                    } 
                    if (target !== 'Anonymous') {
                        value = target;
                        this.props.improvementUpdate({ prop: 'target', value });
                    } 
                    if (result !== 'Anonymous') {
                        value = result;
                        this.props.improvementUpdate({ prop: 'result', value });
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
                <Input
                    label='Activity'
                    placeholder='Activity'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.activity}
                    onChangeText={
                        value => this.props.improvementUpdate({ prop: 'activity', value })
                    }
                    maxLength={100}
                />
                <Input
                    label='Target'
                    placeholder='Target'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.target}
                    onChangeText={
                        value => this.props.improvementUpdate({ prop: 'target', value })
                    }
                    maxLength={100}
                />
                <Input
                    label='Result'
                    placeholder='Result'
                    containerStyle={{ alignSelf: 'center' }}
                    value={this.props.result}
                    onChangeText={
                        value => this.props.improvementUpdate({ prop: 'result', value })
                    }
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
        activity,
        target,
        result,
        assessmentActiveName,
        eid,
        error
    } = state.improvementEmployeeForm;
    return { 
        activity,
        target,
        result,
        assessmentActiveName,
        eid,
        error
    };
};

export default connect(mapStateToProps, { 
    improvementUpdate, improvementCreate
})(ImprovementEmployeeForm);

