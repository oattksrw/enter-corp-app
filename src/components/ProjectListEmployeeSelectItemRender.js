import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { projectUpdate, projectCreate } from '../actions';

class ProjectListEmployeeSelectItemRender extends Component {
    componentWillMount() {
        // this.setGitlabID();
        // this.setPropsAssessmentActive();
        // this.setPropsEmployeeID();
        this.setCountProject();
        setTimeout(() => {
            this.props.projectCreate({
                projectKey: this.props.project.uid,
                name: this.props.project.name,
                assessmentActiveName: this.props.assessmentActiveName,
                eid: this.props.eid,
                numProject: this.props.numProject,
                gitlabID: this.props.gitlab_id,
                project_id: this.props.project.project_id
            });
        }, 200);
    }

    // onRowPress() {
    //     // Actions.employeeEdit({ employee: this.props.project });
    //     this.props.projectCreate({
    //         projectKey: this.props.project.uid,
    //         name: this.props.project.name,
    //         assessmentActiveName: this.props.assessmentActiveName,
    //         eid: this.props.eid,
    //         numProject: this.props.numProject,
    //         gitlabID: this.props.gitlab_id,
    //         project_id: this.props.project.project_id
    //     });
    // }

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

    renderIcon() {
        return (
            <Icon
                name='plus'
                size={15}
                color='green'
            />
        );
    }

    render() {
        // const { name } = this.props.project;
        return (
            <View>

            </View>
            // <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
            //     <ListItem
            //         // key={sectionID}
            //         title={name}
            //         rightIcon={this.renderIcon()}
            //         chevronColor="back"
            //         chevron
            //         bottomDivider
            //     />
            // </TouchableWithoutFeedback>
        );
    }
}

// export default ProjectListEmployeeItemRender;
const mapStateToProps = (state) => {
    const { 
      assessmentActiveName,
      eid,
      gitlab_id,
      numProject

    } = state.projectEmployeeForm;
    return {
      assessmentActiveName,
      eid,
      gitlab_id,
      numProject
    };
};

export default connect(mapStateToProps, { 
  projectUpdate, projectCreate
})(ProjectListEmployeeSelectItemRender);
