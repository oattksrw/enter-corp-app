import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import { projectUpdate, projectCreate } from '../actions';

class ProjectListEmployeeSelectItemRender extends Component {

    onRowPress() {
        Actions.assessmentWorkEmployeePage({ 
            projectName: this.props.project.name,
            projectKey: this.props.project.uid,
            gitlabID: this.props.gitlab_id
        });
    }

    render() {
        const { name } = this.props.project;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <ListItem
                    // key={sectionID}
                    title={name}
                    chevronColor="back"
                    chevron
                    bottomDivider
                />
            </TouchableWithoutFeedback>
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
