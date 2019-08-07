import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import WorkListEmployeeAdditionalItemRender from '../components/WorkListEmployeeAdditionalItemRender';
import { worksAdditionalFetch } from '../actions';

class AssessmentListWorkEmployeeAdditional extends Component {
    componentWillMount() {
        setTimeout(() => {
            this.props.worksAdditionalFetch({ 
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

    createDataSource({ worksAdditional }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(worksAdditional);
    }

    renderRow(work) { //project is key project = array 
        return (
            <WorkListEmployeeAdditionalItemRender
                work={work}
            />
        );
    }

    render() {
        return (
            <View>
                <Text>additional</Text>
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
    const worksAdditional = _.map(state.worksAdditional, (val, uid) => {
        return { ...val, uid };
    }); 

    return { worksAdditional };
};

export default 
connect(mapStateToProps, { worksAdditionalFetch })(AssessmentListWorkEmployeeAdditional);
