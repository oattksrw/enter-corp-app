import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import WorkListEmployeeSelectItemRender from '../components/WorkListEmployeeSelectItemRender';
import { worksSelectFetch } from '../actions';

class AssessmentListWorkEmployeeSelect extends Component {
    componentWillMount() {
        setTimeout(() => {
            console.log(this.props.nameProject);
            this.props.worksSelectFetch({ 
                gitlabID: this.props.gitlab_id,
                nameProject: this.props.nameProject
            });
        }, 200);
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ worksSelect }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(worksSelect);
    }

    renderRow(work) { //project is key project = array 
        return (
            <WorkListEmployeeSelectItemRender
                work={work}
            />
        );
    }

    render() {
        return (
            <View style={{ paddingBottom: 10 }}>
                <Text style={{ color: 'green', fontSize: 16 }}>
                    Project: {this.props.nameProject}
                </Text>
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
    const worksSelect = _.map(state.worksSelect, (val, uid) => {
        return { ...val, uid };
    }); 

    return { worksSelect };
};

export default 
connect(mapStateToProps, { worksSelectFetch })(AssessmentListWorkEmployeeSelect);
