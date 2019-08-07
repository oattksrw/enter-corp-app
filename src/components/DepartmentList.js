import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import DepartmentListItemRender from '../components/DepartmentListItemRender';
import { departmentsFetch } from '../actions';

class DepartmentList extends Component {
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
          <DepartmentListItemRender department={department} />
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
    const departments = _.map(state.departments, (val, uid) => {
        return { ...val, uid };
    }); 
    return { departments };
};

export default connect(mapStateToProps, { departmentsFetch })(DepartmentList);
