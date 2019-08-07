import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import { workUpdate } from '../actions';


class WorkListEmployeeAdditionalItemRender extends Component {
    onRowPress() {
        Actions.workAdditionEdit({
            assessment_name_active: this.props.assessmentActiveName,
            eID: this.props.eid,
            uid_project: this.props.uidProject,
            name_project: this.props.nameProject,
            uid_work: this.props.work.uidWork,
            name_work: this.props.work.name,
            weight_work: this.props.work.weight || '1',
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
        eid
    } = state.workEmployeeForm;
    return {
        uidProject,
        nameProject,
        assessmentActiveName,
        eid
    };
  };
  
  export default connect(mapStateToProps, { 
    workUpdate
  })(WorkListEmployeeAdditionalItemRender);
