import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import WorkAdditionalForm from './WorkAdditionalForm';
import { workAdditionalUpdate, workAdditionalCreate } from '../actions';

class WorkAdditionEdit extends Component {
    componentWillMount() {
        this.setCountWork();
        this.props.workAdditionalUpdate({ 
            prop: 'assessmentActiveName', value: this.props.assessment_name_active
        });
        this.props.workAdditionalUpdate({ 
            prop: 'eid', value: this.props.eID 
        });
        this.props.workAdditionalUpdate({ 
            prop: 'uidProject', value: this.props.uid_project 
        });
        this.props.workAdditionalUpdate({ 
            prop: 'nameProject', value: this.props.name_project
        });
        this.props.workAdditionalUpdate({ 
            prop: 'uidWork', value: this.props.uid_work 
        });
        this.props.workAdditionalUpdate({ 
            prop: 'nameWork', value: this.props.name_work
        });
        this.props.workAdditionalUpdate({ 
            prop: 'resultWork', value: this.props.result_work
        });
        this.props.workAdditionalUpdate({ 
            prop: 'weightWork', value: this.props.weight_work
        });
        this.props.workAdditionalUpdate({ 
            prop: 'scoreEmployeeWork', value: this.props.scoreEmployee
        });
    }


    onButtonPress() {
        const { 
            assessmentActiveName,
            eid,
            uidProject,
            nameWork,
            resultWork,
            weightWork,
            scoreEmployeeWork,
            numWork
        } = this.props;
        
        this.props.workAdditionalCreate({ 
            assessmentActiveName,
            eid,
            uidProject,
            nameWork,
            resultWork,
            weightWork: weightWork || '3',
            scoreEmployeeWork: scoreEmployeeWork || '1',
            numWork
        });
    }

    setCountWork() {
        const assessmentActiveName = this.props.assessmentActive_Name;
        const eid = this.props.eID;
        const uidProject = this.props.uid_project;
        const ref = firebase.database().ref(
            `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/git/${uidProject}/works/additional`
        );
        ref.on('value', snapshot => {
            const numChildren = snapshot.numChildren();
            const value = numChildren.toString();
            this.props.workAdditionalUpdate({ prop: 'numWork', value });
        });
    }

    // renderError() {
    //     if (this.props.error) {
    //         return (
    //             <View style={{ backgroundColor: 'white' }}>
    //                 <Text style={styles.errorTextStyle}>
    //                     {this.props.error}
    //                 </Text>
    //             </View>
    //         );
    //     }
    // }

    // renderIDError() {
    //     if (this.props.id_error) {
    //         return (
    //             <View style={{ backgroundColor: 'white' }}>
    //                 <Text style={styles.errorTextStyle}>
    //                     {this.props.id_error}
    //                 </Text>
    //             </View>
    //         );
    //     }
    // }

    render() {
        return (
            <View>
                <ScrollView contentContainerStyle={{ paddingVertical: 60 }}>
                    <Text style={{ color: 'green', fontSize: 16 }}>
                        Project: {this.props.nameProject}
                    </Text>
                    <WorkAdditionalForm {...this.props} />
                    <View 
                        style={{
                            paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
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
        assessmentActiveName,
        eid,
        uidProject,
        nameProject,
        uidWork,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork,
        numWork
    } = state.workAdditionalForm;
    return { 
        assessmentActiveName,
        eid,
        uidProject,
        nameProject,
        uidWork,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork,
        numWork
    };
};

export default connect(mapStateToProps, { 
    workAdditionalUpdate, workAdditionalCreate
})(WorkAdditionEdit);
