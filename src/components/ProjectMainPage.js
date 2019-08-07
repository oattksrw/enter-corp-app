import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ProjectPage from './ProjectPage';
import { projectProcessUpdate } from '../actions';

class ProjectMainPage extends React.Component {
    render() {
        this.props.projectProcessUpdate({ prop: 'assessmentActiveName', value: this.props.assessmentName });
        this.props.projectProcessUpdate({ prop: 'eid', value: this.props.eID });
        return (
        <View style={{ paddingTop: 60 }}>
            <ProjectPage
                assessmentProcess={this.props.assessmentProcess}
            />
        </View>
        );
    }
}

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
})(ProjectMainPage);
