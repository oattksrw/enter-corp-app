import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import { workUpdate } from '../actions';


class WorkListEmployeeItemRender extends Component {
    onRowPress() {
        Actions.workEdit({
            gitlabID: this.props.gitlab_id,
            assessmentActive_Name: this.props.assessmentActiveName,
            eID: this.props.eid,
            uid_project: this.props.uidProject,
            name_project: this.props.nameProject,
            name_work: this.props.work.name,
            weight_work: this.props.work.weight || '1',
            uid_work: this.props.work.uid,
            result_work: this.props.work.result,
            scoreEmployee: this.props.work.score_of_employee || '3'
        });
    }

    render() {
        const { name } = this.props.work;
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

// export default WorkListEmployeeSelectItemRender;
const mapStateToProps = (state) => {
    const {
      uidProject,
      nameProject,
      assessmentActiveName,
      eid,
      gitlab_id
  
    } = state.workEmployeeForm;
    return {
      uidProject,
      nameProject,
      assessmentActiveName,
      eid,
      gitlab_id
    };
  };
  
  export default connect(mapStateToProps, { 
    workUpdate
  })(WorkListEmployeeItemRender);
