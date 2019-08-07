import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import ProjectListEmployeeAdditionalItemRender 
from '../components/ProjectListEmployeeAdditionalItemRender';
import { projectsAdditionalFetch } from '../actions';

class AssessmentListProjectEmployeeAdditional extends Component {
    componentWillMount() {
        setTimeout(() => { 
            this.props.projectsAdditionalFetch({
                assessmentActiveName: this.props.assessmentActiveName,
                eid: this.props.eid
            });
        }, 200);
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ projectsAdditional }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(projectsAdditional);
    }

    renderRow(projectAdditional) { //project is key project = array 
        return (
            <ProjectListEmployeeAdditionalItemRender
                projectAdditional={projectAdditional}
            />
        );
    }

    render() {
        return (
            <View>
                <Text> Additional </Text>
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
    const projectsAdditional = _.map(state.projectsAdditional, (val, uid) => {
        return { 
            ...val, uid
        };
    }); 
    return { projectsAdditional };
};

export default 
connect(mapStateToProps, { projectsAdditionalFetch })(AssessmentListProjectEmployeeAdditional);
