import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';

class AssessmentProcessListItemRender extends Component {
    onRowPress() {
        Actions.assessmentManagerProcessPage({ assessmentProcess: this.props.assessmentProcess });
    }

    render() {
        const { name, uid } = this.props.assessmentProcess;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <ListItem
                    // key={sectionID}
                    title={name}
                    subtitle={uid}
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

export default AssessmentProcessListItemRender;
