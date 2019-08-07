import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import { projectProcessUpdate } from '../actions';

class ProjectProcessListItemRender extends Component {

    onRowPress() {
        this.props.projectProcessUpdate({ prop: 'uidWork', value: this.props.workProcess.uid });
        Actions.workProcessEdit({ workProcess: this.props.workProcess });
        // this.props.projectProcessUpdate({ prop: 'uidProject', value: this.props.projectProcess.uid });
        // Actions.workProcess({ projectProcess: this.props.projectProcess });
    }

    render() {
        const { name } = this.props.workProcess;
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
        uidProject,
        uidWork
    } = state.projectProcess;
    return {
        assessmentActiveName,
        eid,
        uidProject,
        uidWork
    };
};

export default connect(mapStateToProps, { 
    projectProcessUpdate
})(ProjectProcessListItemRender);
