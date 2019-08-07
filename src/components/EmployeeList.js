import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import EmployeeListItemRender from '../components/EmployeeListItemRender';
import { employeesFetch } from '../actions';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch();
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) { //employee is key employee = array 
        return (
            <EmployeeListItemRender employee={employee} />
        );
    }

    render() {    
        return (
            <View style={{ paddingTop: 60, paddingBottom: 60 }}>
                <ScrollView>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    }); 

    return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
