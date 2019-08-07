import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import WorkListEmployeeItemRender from '../components/WorkListEmployeeItemRender';
import { worksFetch } from '../actions';

class AssessmentListWorkEmployee extends Component {
    componentWillMount() {
        setTimeout(() => {
            this.props.worksFetch({ 
                assessmentActiveName: this.props.assessmentActiveName,
                eid: this.props.eid,
                uidProject: this.props.uidProject
            });
        }, 500);
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ works }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(works);
    }

    renderRow(work) { //project is key project = array 
        return (
            <WorkListEmployeeItemRender
                work={work}
            />
        );
    }

    render() {
        return (
            <View style={{ paddingBottom: 20 }}>
                <Text style={{ color: 'green' }}>success</Text>
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
    const works = _.map(state.works, (val, uid) => {
        return { ...val, uid };
    }); 

    return { works };
};

export default 
connect(mapStateToProps, { worksFetch })(AssessmentListWorkEmployee);
