import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    lightGreen500
} from 'material-ui/styles/colors';
import WorkForm from './WorkForm';
import { workCreateSelectUpdate, workCreateSelectCreate } from '../actions';

class WorkCreate extends Component {
    componentWillMount() {
        this.setCountWork();
        this.props.workCreateSelectUpdate({ 
            prop: 'gitlab_id', value: this.props.gitlabID 
        });
        this.props.workCreateSelectUpdate({ 
            prop: 'assessmentActiveName', value: this.props.assessmentActive_Name 
        });
        this.props.workCreateSelectUpdate({ 
            prop: 'eid', value: this.props.eID 
        });
        this.props.workCreateSelectUpdate({ 
            prop: 'uidProject', value: this.props.uid_project });
        this.props.workCreateSelectUpdate({ 
            prop: 'nameProject', value: this.props.name_project 
        });
        this.props.workCreateSelectUpdate({ 
            prop: 'nameWork', value: this.props.name_work 
        });
        this.props.workCreateSelectUpdate({ 
            prop: 'weightWork', value: this.props.weight_work.toString()
        });
        this.props.workCreateSelectUpdate({ 
            prop: 'resultWork', value: this.props.result_work
        });
    }

    onButtonPress() {
        const { 
            gitlab_id,
            assessmentActiveName,
            eid,
            uidProject,
            nameProject,
            nameWork,
            resultWork,
            weightWork,
            scoreEmployeeWork,
            numWork
        } = this.props;
        
        this.props.workCreateSelectCreate({ 
            gitlabID: gitlab_id,
            assessmentActiveName,
            eid,
            uidProject,
            nameProject,
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
            `/assessments/${assessmentActiveName}/doing/${eid}/assessment/projects/${uidProject}/works`
        );
        ref.on('value', snapshot => {
            const numChildren = snapshot.numChildren();
            const value = numChildren.toString();
            this.props.workCreateSelectUpdate({ prop: 'numWork', value });
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
                    <Text style={{ fontSize: 16 }}>
                        Work: {this.props.nameWork}
                    </Text>
                    <WorkForm {...this.props} />
                    <View 
                        style={{
                            paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            loading={this.props.loading}
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
        gitlab_id,
        assessmentActiveName,
        eid,
        uidProject,
        nameProject,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork,
        numWork,
        loading
    } = state.workCreateSelect;
    return { 
        gitlab_id,
        assessmentActiveName,
        eid,
        uidProject,
        nameProject,
        nameWork,
        resultWork,
        weightWork,
        scoreEmployeeWork,
        numWork,
        loading
    };
};

export default connect(mapStateToProps, { 
    workCreateSelectUpdate, workCreateSelectCreate
})(WorkCreate);
