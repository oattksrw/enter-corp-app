import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { employeeUpdate } from '../actions';

class DepartmentSelectListItemRender extends Component {
    onRowPress() {
        const value = this.props.departmentSelect.name;
        this.props.employeeUpdate({ prop: 'department', value });
    }

    render() {
        const { name } = this.props.departmentSelect;
        
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <ListItem
                    // key={sectionID}
                    title={name}
                    chevronColor="back"
                    chevron
                    bottomDivider
                    topDivider
                />
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        department
    } = state.employeeForm;
    return { 
        department
    };
};
// export default DepartmentSelectListItemRender;
export default connect(mapStateToProps, { 
    employeeUpdate
})(DepartmentSelectListItemRender);
