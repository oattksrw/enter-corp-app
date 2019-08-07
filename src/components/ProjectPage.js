import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ProjectProcessListItemRender from '../components/ProjectProcessListItemRender';
import { projectProcessFetch } from '../actions';

class ProjectPage extends Component {
    componentWillMount() {
        this.props.projectProcessFetch({ projects: this.props.assessmentProcess.assessment.projects });
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ projectsProcess }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(projectsProcess);
    }

    renderRow(projectProcess) { //project is key project = array 
        return (
            <ProjectProcessListItemRender
                projectProcess={projectProcess}
            />
        );
    }

    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const projectsProcess = _.map(state.projectsProcess, (val, uid) => {
        return { 
            ...val, uid
        };
    });
    
    return { projectsProcess };
};

export default connect(mapStateToProps, { projectProcessFetch })(ProjectPage);
