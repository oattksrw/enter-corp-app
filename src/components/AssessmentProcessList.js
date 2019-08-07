import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import AssessmentProcessListItemRender from '../components/AssessmentProcessListItemRender';
import { assessmentsProcessFetch } from '../actions';

class AssessmentProcessList extends Component {
    componentWillMount() {
        // setTimeout(() => { 
        //     this.props.projectsFetch({
        //         assessmentActiveName: this.props.assessmentActiveName,
        //         eid: this.props.eid
        //     });
        // }, 200);
        this.props.assessmentsProcessFetch();
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ assessmentsProcess }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(assessmentsProcess);
    }

    renderRow(assessmentProcess) { //project is key project = array 
        return (
            <AssessmentProcessListItemRender
                assessmentProcess={assessmentProcess}
            />
        );
    }

    render() {
        return (
            <View style={{ paddingBottom: 20 }}>
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
    const assessmentsProcess = _.map(state.assessmentsProcess, (val, uid) => {
        return { 
            ...val, uid
        };
    });

    return { assessmentsProcess };
};

export default connect(mapStateToProps, { assessmentsProcessFetch })(AssessmentProcessList);
