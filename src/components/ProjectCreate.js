import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import { projectUpdate, projectAdditionalCreate } from '../actions';

class ProjectCreate extends Component {
    componentWillMount() {
        // this.props.employeeReset();
        this.setCountProject();
    }

    onButtonPress() {
        const {
            projectName,
            workName,
            result,
            weight,
            score, 
            assessmentActiveName, 
            eid, 
            numProject 
        } = this.props;
        
        this.props.projectAdditionalCreate({
            projectName,
            workName,
            result,
            weight: weight || '3',
            score: score || '0',
            assessmentActiveName, 
            eid, 
            numProject 
        });
    }

    setCountProject() {
        const assessmentActiveName = this.props.assessmentActiveName;
        const eid = this.props.eid;
        const ref = firebase.database().ref(
            `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects`
        );
        ref.on('value', snapshot => {
            const numChildren = snapshot.numChildren();
            const value = numChildren.toString();
            this.props.projectUpdate({ prop: 'numProject', value });
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
                <ScrollView contentContainerStyle={{ paddingVertical: 60 }}>
                    <Card>
                        <Input
                            label='Project Name'
                            placeholder='name of projecr'
                            containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                            value={this.props.projectName}
                            onChangeText={
                                value => this.props.projectUpdate({ prop: 'projectName', value })
                            }
                        />
                        {/* {this.renderIDError()} */}
                        {/* {this.renderError()} */}
                    </Card>
                    <Card>
                        <Input
                            label='Work Name'
                            placeholder='name of work'
                            containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                            value={this.props.workName}
                            onChangeText={
                                value => this.props.projectUpdate({ prop: 'workName', value })
                            }
                        />
                        <Input
                            label='Result'
                            placeholder='result of work'
                            containerStyle={{ marginTop: 20, alignSelf: 'center' }}
                            value={this.props.result}
                            onChangeText={
                                value => this.props.projectUpdate({ prop: 'result', value })
                            }
                        />

                        <Text style={{ fontSize: 16 }}>Weight</Text>
                        <Picker
                            style={{ width: '100%' }}
                            selectedValue={this.props.weight}
                            onValueChange={
                                value => this.props.projectUpdate({ prop: 'weight', value })
                            }
                        >
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                            <Picker.Item label='7' value='7' />
                            <Picker.Item label='8' value='8' />
                            <Picker.Item label='9' value='9' />
                            <Picker.Item label='10' value='10' />
                            <Picker.Item label='11' value='11' />
                            <Picker.Item label='12' value='12' />
                            <Picker.Item label='13' value='13' />
                        </Picker>
                        <Text style={{ fontSize: 16 }}>Score</Text>
                        <Picker
                            style={{ width: '100%' }}
                            selectedValue={this.props.score}
                            onValueChange={
                                value => this.props.projectUpdate({
                                    prop: 'score', value 
                                })
                            }
                        >
                            <Picker.Item label='0' value='0' />
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                        </Picker>
                    </Card>
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
                            title='Creat'
                            buttonStyle={styles.buttonStyle}
                            containerStyle={{ marginTop: 20 }}
                        />
                    </View>
                </ScrollView>
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
    },
};

const mapStateToProps = (state) => {
    const {
        projectName,
        workName,
        result,
        weight,
        score,
        assessmentActiveName,
        eid,
        gitlab_id,
        numProject,
        error
    } = state.projectEmployeeForm;
    return {
        projectName,
        workName,
        result,
        weight,
        score,
        assessmentActiveName,
        eid,
        gitlab_id,
        numProject,
        error
    };
};

export default connect(mapStateToProps, { 
    projectUpdate, projectAdditionalCreate
})(ProjectCreate);
