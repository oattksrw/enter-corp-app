import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import { projectUpdate, projectCreate } from '../actions';

class ProjectListEmployeeAdditionalItemRender extends Component {

    onRowPress() {
        Actions.assessmentWorkEmployeeAdditionalPage({ 
            projectName: this.props.projectAdditional.name,
            projectKey: this.props.projectAdditional.uid
        });
    }

    render() {
        const { name } = this.props.projectAdditional;
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
})(ProjectListEmployeeAdditionalItemRender);
