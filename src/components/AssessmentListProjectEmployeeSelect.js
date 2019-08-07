import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ProjectListEmployeeSelectItemRender from '../components/ProjectListEmployeeSelectItemRender';
import { projectsSelectFetch } from '../actions';

class AssessmentListProjectEmployeeSelect extends Component {
    componentWillMount() {
        setTimeout(() => { 
            this.props.projectsSelectFetch({ gitlabID: this.props.gitlab_id });
        }, 500);
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ projectsSelect }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(projectsSelect);
    }

    renderRow(project) { //project is key project = array 
        return (
            <ProjectListEmployeeSelectItemRender
                project={project}
            />
        );
    }

    render() {
        return (
            <View style={{ paddingBottom: 30 }}>
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
    const projectsSelect = _.map(state.projectsSelect, (val, uid) => {
        return { ...val, uid };
    }); 

    return { projectsSelect };
};

export default 
connect(mapStateToProps, { projectsSelectFetch })(AssessmentListProjectEmployeeSelect);
