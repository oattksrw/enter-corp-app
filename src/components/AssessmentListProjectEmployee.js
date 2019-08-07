import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ProjectListEmployeeItemRender from '../components/ProjectListEmployeeItemRender';
import { projectsFetch } from '../actions';

class AssessmentListProjectEmployee extends Component {
    componentWillMount() {
        setTimeout(() => { 
            this.props.projectsFetch({
                assessmentActiveName: this.props.assessmentActiveName,
                eid: this.props.eid
            });
        }, 200);
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ projects }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(projects);
    }

    renderRow(project) { //project is key project = array 
        return (
            <ProjectListEmployeeItemRender
                project={project}
            />
        );
    }

    render() {
        return (
            <View style={{ paddingBottom: 20 }}>
                {/* <Text style={{ color: 'red' }}> must to do </Text> */}
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
    const projects = _.map(state.projects, (val, uid) => {
        return { 
            ...val, uid
        };
    }); 

    return { projects };
};

export default connect(mapStateToProps, { projectsFetch })(AssessmentListProjectEmployee);
