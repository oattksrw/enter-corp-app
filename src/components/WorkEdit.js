import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import WorkFormEdit from './WorkFormEdit';
import { workEditUpdate, workEditSave } from '../actions';

class WorkEdit extends Component {
    componentWillMount() {
        console.log(this.props.result_work);
        this.props.workEditUpdate({ 
            prop: 'assessmentActiveName', value: this.props.assessmentActive_Name 
        });
        this.props.workEditUpdate({ 
            prop: 'eid', value: this.props.eID 
        });
        this.props.workEditUpdate({ 
            prop: 'uidProject', value: this.props.uid_project 
        });

        this.props.workEditUpdate({ 
            prop: 'nameProject', value: this.props.name_project 
        });
        this.props.workEditUpdate({ 
            prop: 'uidWork', value: this.props.uid_work 
        });
        this.props.workEditUpdate({ 
            prop: 'nameWork', value: this.props.name_work 
        });
        this.props.workEditUpdate({ 
            prop: 'resultWork', value: this.props.result_work
        });
        this.props.workEditUpdate({ 
            prop: 'weightWork', value: this.props.weight_work
        });
        this.props.workEditUpdate({
            prop: 'scoreEmployeeWork', value: this.props.scoreEmployee
        });
    }

    onButtonPress() {
        const { 
            assessmentActiveName,
            eid,
            uidProject,
            uidWork,
            resultWork,
            weightWork,
            scoreEmployeeWork
        } = this.props;
        
        this.props.workEditSave({ 
            assessmentActiveName,
            eid,
            uidProject,
            uidWork,
            resultWork,
            weightWork: weightWork || '1',
            scoreEmployeeWork: scoreEmployeeWork || '3'
        });
    }

    // setCountWork() {
    //     const assessmentActiveName = this.props.assessmentActive_Name;
    //     const eid = this.props.eID;
    //     const uidProject = this.props.uid_project;
    //     const ref = firebase.database().ref(
    //         `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/git/${uidProject}/works/git`
    //     );
    //     ref.on('value', snapshot => {
    //         const numChildren = snapshot.numChildren();
    //         const value = numChildren.toString();
    //         this.props.workCreateSelectUpdate({ prop: 'numWork', value });
    //     });
    // }

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
                    <Text style={{ fontSize: 16 }}>
                        Work: {this.props.nameWork}
                    </Text>
                    <WorkFormEdit {...this.props} />
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
        scoreEmployeeWork
    } = state.workEdit;
    return { 
        assessmentActiveName,
        eid,
        uidProject,
        nameProject,
        uidWork,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork
    };
};

export default connect(mapStateToProps, { 
    workEditUpdate, workEditSave
})(WorkEdit);
