import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { workUpdate } from '../actions';
import WorkCreateAdditional from './WorkCreateAdditional';

class WorkCreateAdditionalMain extends Component {

    render() {
        return (
            <View>
                <ScrollView>
                    <WorkCreateAdditional 
                        uid_project={this.props.uidProject}
                        name_project={this.props.nameProject}
                        assessment_name_active={this.props.assessmentActiveName}
                        eID={this.props.eid}
                    />
                </ScrollView>
            </View>
        );
    }
}

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
})(WorkCreateAdditionalMain);
