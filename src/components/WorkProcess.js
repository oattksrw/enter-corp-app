import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import WorkProcessListItemRender from '../components/WorkProcessListItemRender';
import { workProcessFetch } from '../actions';

class WorkProcess extends Component {
    componentWillMount() {
        this.props.workProcessFetch({ works: this.props.projectProcess.works });
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ worksProcess }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(worksProcess);
    }

    renderRow(workProcess) { //project is key project = array 
        return (
            <WorkProcessListItemRender
                workProcess={workProcess}
            />
        );
    }

    render() {
        return (
            <View style={{ paddingTop: 60 }}>
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
    const worksProcess = _.map(state.worksProcess, (val, uid) => {
        return { 
            ...val, uid
        };
    });
    
    return { worksProcess };
};

export default connect(mapStateToProps, { workProcessFetch })(WorkProcess);
