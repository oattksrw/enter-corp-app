import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';

class DepartmentListItemRender extends Component {
    onRowPress() {
        Actions.departmentEdit({ department: this.props.department });
    }

    render() {
        const { name } = this.props.department;
        
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <ListItem
                    // key={sectionID}
                    title={name}
                    chevronColor="back"
                    chevron
                    bottomDivider
                />
            </TouchableWithoutFeedback>
        );
    }
}

// const styles = {
//     titleStyle: {
//         fontSize: 18,
//         paddingLeft: 15
//     }
// };

export default DepartmentListItemRender;
