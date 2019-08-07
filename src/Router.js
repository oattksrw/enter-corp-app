import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    lightGreen500,
    grey800
} from 'material-ui/styles/colors';
import LoginForm from './components/LoginForm';
// import StatisticsList from './components/StatisticsList';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import DepartmentList from './components/DepartmentList';
import DepartmentCreate from './components/DepartmentCreate';
import AssessmentMangerPage from './components/AssessmentMangerPage';
import SettingPage from './components/SettingPage';
import EmployeePage from './components/EmployeePage';
import AnotherPage from './components/AnotherPage';
import EmployeeEdit from './components/EmployeeEdit';
import DepartmentEdit from './components/DepartmentEdit';
import WaitingPage from './components/WaitingPage';
import ChangePasswordPage from './components/ChangePasswordPage';
import AssessmentManagerLoding from './components/AssessmentManagerLoding';
import AssessmentCreate from './components/AssessmentCreate';
import AssessmentEmployeeeLoding from './components/AssessmentEmployeeeLoding';
import AssessmentEmployeePage from './components/AssessmentEmployeePage';
import AssessmentDisablePage from './components/AssessmentDisablePage';
import AssessmentProjectEmployeePage from './components/AssessmentProjectEmployeePage';
import AssessmentImprovementEmployeePage from './components/AssessmentImprovementEmployeePage';
import AssessmentOpinionEmployeePage from './components/AssessmentOpinionEmployeePage';
import AssessmentSuggestionEmployeePage from './components/AssessmentSuggestionEmployeePage';
import AssessmentWorkEmployeePage from './components/AssessmentWorkEmployeePage';
import ProjectCreate from './components/ProjectCreate';
import WorkCreate from './components/WorkCreate';
import WorkEdit from './components/WorkEdit';
import WorkCreateAdditionalMain from './components/WorkCreateAdditionalMain';
import WorkAdditionEdit from './components/WorkAdditionEdit';
import AssessmentWorkEmployeeAdditionalPage from './components/AssessmentWorkEmployeeAdditionalPage';
import AssessmentSended from './components/AssessmentSended';
import AssessmentManagerProcessPage from './components/AssessmentManagerProcessPage';
import ImprovementPage from './components/ImprovementPage';
import SuggestionPage from './components/SuggestionPage';
import OpinionPage from './components/OpinionPage';
import ProjectMainPage from './components/ProjectMainPage';
import WorkProcess from './components/WorkProcess';
import WorkProcessEdit from './components/WorkProcessEdit';
import AssessmentDepartmentList from './components/AssessmentDepartmentList';
import AssessmentUndefind from './components/AssessmentUndefind';
import RejectForm from './components/RejectForm';

const TabIcon = ({ selected, title }) => {
    const activeColor = lightGreen500;
    const labelColor = grey800;
    const textMenu = <Text style={{ color: selected ? activeColor : labelColor }}>{title}</Text>;

    switch (title) {
        case 'Statistic':
            return (
                <View 
                    style={style.style}
                >
                    <Ionicons 
                        name='md-podium'
                        size={30}
                        color={selected ? activeColor : labelColor} 
                    />
                    {textMenu}
                </View>
            );
        case 'Employee':
            return (
                <View 
                    style={style.style}
                >
                    <Ionicons
                        name='md-people'
                        size={30}
                        color={selected ? activeColor : labelColor}
                    />
                    {textMenu}
                </View>
            );
        case 'Department':
            return (
                <View 
                    style={style.style}
                >
                    <Ionicons
                        name='md-construct'
                        size={30}
                        color={selected ? activeColor : labelColor}
                    />
                    {textMenu}
                </View>
            );
        case 'Assessment':
            return (
                <View 
                    style={style.style}
                >
                    <Ionicons
                        name='md-document'
                        size={30}
                        color={selected ? activeColor : labelColor}
                    />
                    {textMenu}
                </View>
            );
        case 'Setting':
            return (
                <View 
                style={style.style}
                >
                    <Ionicons
                        name='md-settings'
                        size={30}
                        color={selected ? activeColor : labelColor}
                    />
                    {textMenu}
                </View>
            );
        default : return 0;
      }
};

const RouterComponent = () => {
    return (
        <Router
            navigationBarStyle={{ backgroundColor: lightGreen500 }}
            titleStyle={{ color: 'white' }}
        > 
            <Scene key='helloApp'>
                <Scene
                    hideNavBar
                    key='waitingPage'
                    component={WaitingPage}
                    initial
                />
            </Scene>

            <Scene key='auth'>
                <Scene
                    key='login'
                    component={LoginForm}
                    title='Please Login'
                />
            </Scene>

            <Scene key='employeeMain'>
                <Scene
                    key="tabarEmployee"
                    tabs
                    hideNavBar
                    tabBarStyle={style.tabBarStyle}
                >
                    {/* <Scene key="Me" title="Employee" icon={TabIcon} initial>
                        <Scene
                            key='employeePage'
                            component={EmployeePage}
                            title='Me'
                            initial
                        />
                    </Scene> */}
                    <Scene key="assessment" title="Assessment" icon={TabIcon}>
                        <Scene
                            key='assessmentEmployeeeLoding'
                            component={AssessmentEmployeeeLoding}
                            title='Loading Assessment'
                            initial
                        />
                        <Scene
                            key='assessmentEmployeePage'
                            component={AssessmentEmployeePage}
                            title='Assessment'
                        />
                        <Scene
                            key='assessmentProjectEmployeePage'
                            component={AssessmentProjectEmployeePage}
                            title='Project List'
                        />
                        <Scene
                            onRight={() => Actions.projectCreate()}
                            rightTitle='Add'
                            key='assessmentProjectEmployeePage'
                            component={AssessmentProjectEmployeePage}
                            title='Project List'
                        />
                        <Scene
                            key='projectCreate'
                            component={ProjectCreate}
                            title='Project Create'
                        />
                        {/* <Scene
                            key='assessmentWorkEmployeePage'
                            component={AssessmentWorkEmployeePage}
                            title='Work List'
                        /> */}
                        <Scene
                            onRight={() => Actions.workCreateAdditionalMain()}
                            rightTitle='Add'
                            key='assessmentWorkEmployeePage'
                            component={AssessmentWorkEmployeePage}
                            title='Work List'
                        />
                        <Scene
                            key='workCreate'
                            component={WorkCreate}
                            title='Work Assessment'
                        />
                        <Scene
                            key='workEdit'
                            component={WorkEdit}
                            title='Work Assessment Edit'
                        />
                        <Scene
                            key='workCreateAdditionalMain'
                            component={WorkCreateAdditionalMain}
                            title='Work Assessment Additional'
                        />
                        <Scene
                            key='workAdditionEdit'
                            component={WorkAdditionEdit}
                            title='Work Assessment Additional Edit'
                        />
                        <Scene
                            key='assessmentWorkEmployeeAdditionalPage'
                            component={AssessmentWorkEmployeeAdditionalPage}
                            title='Work Additional list'
                        />
                        <Scene
                            key='assessmentImprovementEmployeePage'
                            component={AssessmentImprovementEmployeePage}
                            title='Improvement'
                        />
                        <Scene
                            key='assessmentOpinionEmployeePage'
                            component={AssessmentOpinionEmployeePage}
                            title='Opinion'
                        />
                        <Scene
                            key='assessmentSuggestionEmployeePage'
                            component={AssessmentSuggestionEmployeePage}
                            title='Suggestion'
                        />
                        <Scene
                            key='assessmentDisablePage'
                            component={AssessmentDisablePage}
                            title='Assessment'
                        />
                        <Scene
                            key='assessmentSended'
                            component={AssessmentSended}
                            title='Assessment'
                        />
                        <Scene
                            key='assessmentUndefind'
                            component={AssessmentUndefind}
                            title='Assessment'
                        />

                    </Scene>
                    <Scene key="settingEmployee" title="Setting" icon={TabIcon}>
                        <Scene
                            key='setting'
                            component={SettingPage}
                            title='Setting'
                            initial
                        />
                    </Scene>
                </Scene>
            </Scene>

            <Scene key='anotherMain'>
                <Scene
                    onRight={() => Actions.auth()}
                    rightTitle='Back to home'
                    key='anotherPage'
                    component={AnotherPage}
                    title='AnotherPage'
                    initial
                />
            </Scene>

            <Scene key='managerMain'>
                <Scene
                    key="tabar"
                    tabs
                    hideNavBar
                    tabBarStyle={style.tabBarStyle}
                >
                    {/* <Scene key="statistics" title="Statistic" icon={TabIcon}>
                        <Scene
                            key='statisticsList'
                            component={StatisticsList}
                            title='Statistics'
                            initial
                        />
                    </Scene> */}
                    <Scene key="employees" title="Employee" icon={TabIcon}>
                        <Scene
                            onRight={() => Actions.employeeCreate()}
                            rightTitle='Add'
                            key='employeeList'
                            component={EmployeeList}
                            title='Employees'
                        />
                        <Scene
                            key='employeeCreate'
                            component={EmployeeCreate}
                            title='Create Employee'
                        />
                        <Scene 
                            key="employeeEdit" 
                            component={EmployeeEdit} 
                            title="Edit Employee" 
                        />
                    </Scene>
                    <Scene key="departments" title="Department" icon={TabIcon}>
                        <Scene
                            onRight={() => Actions.departmentCreate()}
                            rightTitle='Add'
                            key='departmentList'
                            component={DepartmentList}
                            title='Departments'
                            initial
                        />
                        <Scene
                            key='departmentCreate'
                            component={DepartmentCreate}
                            title='Departments'
                        />
                        <Scene 
                            key="departmentEdit" 
                            component={DepartmentEdit} 
                            title="Edit Department" 
                        />
                    </Scene>
                    <Scene key="assessments" title="Assessment" icon={TabIcon}>
                        <Scene
                            key='assessmentManagerLoding'
                            component={AssessmentManagerLoding}
                            title='Loading Assessments'
                            initial
                        />
                        <Scene
                            key='assessmentCreate'
                            component={AssessmentCreate}
                            title='Assessments Create'
                        />
                        <Scene
                            key='assessmentDepartmentList'
                            component={AssessmentDepartmentList}
                            title='Assessments'
                        />
                        <Scene
                            key='assessmentMangerPage'
                            component={AssessmentMangerPage}
                            title='Assessments'
                        />
                        <Scene
                            key='assessmentManagerProcessPage'
                            component={AssessmentManagerProcessPage}
                            title='Assessment'
                        />
                        <Scene
                            key='projectMainPage'
                            component={ProjectMainPage}
                            title='Project'
                        />
                        <Scene
                            key='workProcess'
                            component={WorkProcess}
                            title='Works'
                        />
                        <Scene
                            key='workProcessEdit'
                            component={WorkProcessEdit}
                            title='Work Assessment'
                        />
                        <Scene
                            key='improvementPage'
                            component={ImprovementPage}
                            title='Improvement'
                        />
                        <Scene
                            key='suggestionPage'
                            component={SuggestionPage}
                            title='Suggestion'
                        />
                        <Scene
                            key='opinionPage'
                            component={OpinionPage}
                            title='Opinion'
                        />
                        <Scene
                            key='rejectForm'
                            component={RejectForm}
                            title='Comment'
                        />
                    </Scene>
                    <Scene key="setting" title="Setting" icon={TabIcon}>
                        <Scene
                            key='settingPage'
                            component={SettingPage}
                            title='Setting'
                            initial
                        />
                        <Scene
                            key='changePasswordPage'
                            component={ChangePasswordPage}
                            title='Change Password'
                        />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
};

const style = StyleSheet.create({
    tabBarStyle: {
        borderTopWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: 'white',
        opacity: 1
    },
    style: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default RouterComponent;
