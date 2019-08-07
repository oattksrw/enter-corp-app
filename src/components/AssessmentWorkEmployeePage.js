import React from 'react';
import { View, ScrollView } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { 
    blue500
} from 'material-ui/styles/colors';
// import firebase from 'firebase';
import { workUpdate } from '../actions';
import AssessmentListWorkEmployeeSelect from './AssessmentListWorkEmployeeSelect';
import AssessmentListWorkEmployee from './AssessmentListWorkEmployee';
// import AssessmentListWorkEmployeeAdditional from './AssessmentListWorkEmployeeAdditional';

class AssessmentWorkEmployeePage extends React.Component {
  componentWillMount() {
    // console.log(this.props.nameProject);
    if (this.props.projectKey != null) {
      this.props.workUpdate({ 
        prop: 'uidProject', value: this.props.projectKey
      });
    } else {
      this.props.workUpdate({
        prop: 'uidProject', value: this.props.uidProject 
      });
    }
    if (this.props.projectName != null) {
      this.props.workUpdate({ 
        prop: 'nameProject', value: this.props.projectName
      });
    } else {
      this.props.workUpdate({ 
        prop: 'nameProject', value: this.props.nameProject 
      });
    }
    if (this.props.gitlabID != null) {
      this.props.workUpdate({ 
        prop: 'gitlab_id', value: this.props.gitlabID
      });
    } else {
      this.props.workUpdate({ 
        prop: 'gitlab_id', value: this.props.gitlab_id 
      });
    }
    this.setGitlabID();
    this.setPropsAssessmentActive();
    this.setPropsEmployeeID();
  }

  onButtonPress() {
    Actions.assessmentProjectEmployeePage({ type: 'reset' });
  }

  setPropsAssessmentActive() {
    firebase.database().ref('/assessments')
    .on('value', snapshot => {
        const value = (snapshot.val() && snapshot.val().active) || 'Anonymous';
        this.props.workUpdate({ prop: 'assessmentActiveName', value });
    });
  }

  setPropsEmployeeID() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
    .on('value', snapshot => {
            const value = (snapshot.val() && snapshot.val().employee_id) || 'Anonymous';
            this.props.workUpdate({ prop: 'eid', value });
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
                      this.props.workUpdate({ prop: 'gitlab_id', value });
                  });
        });
  }

  renderListSelect() { 
    if (this.props.listSelectOn) {
      return (
        <AssessmentListWorkEmployeeSelect 
              gitlab_id={this.props.gitlab_id}
              eid={this.props.eid}
              assessmentActiveName={this.props.assessmentActiveName}
              nameProject={this.props.nameProject}
              uidProject={this.props.uidProject}
        />
      );
    }
  }

  renderList() {
    if (this.props.listOn) {
      return (
        <AssessmentListWorkEmployee
              gitlab_id={this.props.gitlab_id}
              eid={this.props.eid}
              assessmentActiveName={this.props.assessmentActiveName}
              nameProject={this.props.nameProject}
              uidProject={this.props.uidProject}
        />
      );
    }
  }

  render() {
    return (
      <View style={{ paddingTop: 60, paddingBottom: 60 }}>
        <ScrollView>
          {this.renderListSelect()}
          {this.renderList()}
          {/* <AssessmentListWorkEmployeeAdditional
            gitlab_id={this.props.gitlab_id}
            eid={this.props.eid}
            assessmentActiveName={this.props.assessmentActiveName}
            nameProject={this.props.nameProject}
            uidProject={this.props.uidProject}
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
    uidProject,
    nameProject,
    assessmentActiveName,
    eid,
    gitlab_id

  } = state.workEmployeeForm;
  return {
    listSelectOn,
    listOn,
    uidProject,
    nameProject,
    assessmentActiveName,
    eid,
    gitlab_id
  };
};

export default connect(mapStateToProps, { 
  workUpdate
})(AssessmentWorkEmployeePage);
