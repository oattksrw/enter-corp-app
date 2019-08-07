import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import DepartmentSelectListItemRender from '../components/DepartmentSelectListItemRender';
import { departmentsFetch } from '../actions';

class DepartmentSelect extends Component {
    componentWillMount() {
        this.props.departmentsFetch();
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ departments }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(departments);
    }

    renderRow(department) {
        return (
            <DepartmentSelectListItemRender departmentSelect={department} />
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
    const departments = _.map(state.departments, (val, uid) => {
        return { ...val, uid };
    });
    return { departments };
};

export default connect(mapStateToProps, { departmentsFetch })(DepartmentSelect);
