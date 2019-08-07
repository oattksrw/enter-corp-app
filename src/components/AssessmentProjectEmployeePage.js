import React, { Component } from 'react';
import firebase from 'firebase';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { 
    blue500
} from 'material-ui/styles/colors';
import AssessmentListProjectEmployeeSelect from './AssessmentListProjectEmployeeSelect';
import AssessmentListProjectEmployee from './AssessmentListProjectEmployee';
// import AssessmentListProjectEmployeeAdditional from './AssessmentListProjectEmployeeAdditional';
import { projectUpdate } from '../actions';

class AssessmentProjectEmployeePage extends Component {
  componentWillMount() {
      this.setGitlabID();
      this.setPropsAssessmentActive();
      this.setPropsEmployeeID();
  }
  onButtonPress() {
    Actions.assessmentEmployeePage({ type: 'reset' });
  }

  setPropsAssessmentActive() {
    firebase.database().ref('/assessments')
    .on('value', snapshot => {
        const value = (snapshot.val() && snapshot.val().active) || 'Anonymous';
        this.props.projectUpdate({ prop: 'assessmentActiveName', value });
    });
  }

  setPropsEmployeeID() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
    .on('value', snapshot => {
            const value = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
            this.props.projectUpdate({ prop: 'eid', value });
        });
  }
  setGitlabID() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
    .on('value', snapshot => {
            const eid = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
            firebase.database().ref(`/employees/${eid}`)
              .on('value', snap => {
                      const value = (snap.val() && snap.val().gitlab_id) || 'Anonymous';
                      this.props.projectUpdate({ prop: 'gitlab_id', value });
                  });
        });
  }

  renderListSelect() {
    if (this.props.listSelectOn) {
      return (
        <AssessmentListProjectEmployeeSelect 
          gitlab_id={this.props.gitlab_id}
          eid={this.props.eid}
          assessmentActiveName={this.props.assessmentActiveName}
        />
      );
    }
  }

  renderList() {
     //if (this.props.listOn) {
      return (
        <AssessmentListProjectEmployee
            gitlab_id={this.props.gitlab_id}
            eid={this.props.eid}
            assessmentActiveName={this.props.assessmentActiveName}
        />
      );
    //}

    // if (this.props.listOn) {
    //   return (
    //     <AssessmentListProjectEmployee
    //         gitlab_id={this.props.gitlab_id}
    //         eid={this.props.eid}
    //         assessmentActiveName={this.props.assessmentActiveName}
    //     />
    //   );
    // }
  }

  render() {
    return (
      <View style={{ paddingTop: 60, paddingBottom: 60 }}>
        <ScrollView>
          {this.renderListSelect()}
          {this.renderList()}
          {/* <AssessmentListProjectEmployeeAdditional
            gitlab_id={this.props.gitlab_id}
            eid={this.props.eid}
            assessmentActiveName={this.props.assessmentActiveName}
          /> */}
          <View 
            style={{
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}
          >
            <Button
                  loading={this.props.loading}
                  icon={
                      <Icon
                      name='arrow-left'
                      size={15}
                      color='white'
                      />
                  }
                  title='Back'
                  iconLeft
                  buttonStyle={styles.buttonStyle}
                  containerStyle={{ marginTop: 20 }}
                  onPress={this.onButtonPress.bind(this)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: blue500,
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  }
};

const mapStateToProps = (state) => {
    const {
      listSelectOn,
      listOn,
      assessmentActiveName,
      eid,
      gitlab_id

    } = state.projectEmployeeForm;
    return {
      listSelectOn,
      listOn,
      assessmentActiveName,
      eid,
      gitlab_id
    };
};

export default connect(mapStateToProps, { 
  projectUpdate
})(AssessmentProjectEmployeePage);
