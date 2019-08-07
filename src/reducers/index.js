import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';
import DepartmentFormReducer from './DepartmentFormReducer';
import DepartmentReducer from './DepartmentReducer';
import ChangePasswordReducer from './ChangePasswordReducer';
import AssessmentFormReducer from './AssessmentFormReducer';
import ImprovementEmployeeFormReducer from './ImprovementEmployeeFormReducer';
import OpinionEmployeeFormReducer from './OpinionEmployeeFormReducer';
import SuggestionEmployeeFormReducer from './SuggestionEmployeeFormReducer';
import AssessmentListEmployeeReducer from './AssessmentListEmployeeReducer';
import ProjectEmployeeFormReducer from './ProjectEmployeeFormReducer';
import ProjectReducer from './ProjectReducer';
import ProjectSelectReducer from './ProjectSelectReducer';
import ProjectAdditionalReducer from './ProjectAdditionalReducer';
import WorkEmployeeFormReducer from './WorkEmployeeFormReducer';
import WorkSelectReducer from './WorkSelectReducer';
import WorkCreateSelectReducer from './WorkCreateSelectReducer';
import WorkReducer from './WorkReducer';
import WorkEditReducer from './WorkEditReducer';
import WorkAdditionalFormReducer from './WorkAdditionalFormReducer';
import WorkAdditionalReducer from './WorkAdditionalReducer';
import AssessmentProcessReducer from './AssessmentProcessReducer';
import ProcessAssessmentReducer from './ProcessAssessmentReducer';
import ProjectProcessReducer from './ProjectProcessReducer';
import ManagerProjectProcessReducer from './ManagerProjectProcessReducer';
import WorkProcessReducer from './WorkProcessReducer';
import WorkProcessEditReducer from './WorkProcessEditReducer';
import RejectFormReducer from './RejectFormReducer';

export default combineReducers({
    auth: AuthReducer,
    changePassword: ChangePasswordReducer,
    employeeForm: EmployeeFormReducer,
    employees: EmployeeReducer,
    projects: ProjectReducer,
    departmentForm: DepartmentFormReducer,
    departments: DepartmentReducer,
    assessmentForm: AssessmentFormReducer,
    improvementEmployeeForm: ImprovementEmployeeFormReducer,
    opinionEmployeeForm: OpinionEmployeeFormReducer,
    suggestionEmployeeForm: SuggestionEmployeeFormReducer,
    assessmentListEmployee: AssessmentListEmployeeReducer,
    projectEmployeeForm: ProjectEmployeeFormReducer,
    projectsSelect: ProjectSelectReducer,
    projectsAdditional: ProjectAdditionalReducer,
    workEmployeeForm: WorkEmployeeFormReducer,
    worksSelect: WorkSelectReducer,
    workCreateSelect: WorkCreateSelectReducer,
    works: WorkReducer,
    workEdit: WorkEditReducer,
    workAdditionalForm: WorkAdditionalFormReducer,
    worksAdditional: WorkAdditionalReducer,
    assessmentsProcess: AssessmentProcessReducer,
    processAssessment: ProcessAssessmentReducer,
    projectsProcess: ProjectProcessReducer,
    projectProcess: ManagerProjectProcessReducer,
    worksProcess: WorkProcessReducer,
    workProcessEdit: WorkProcessEditReducer,
    rejectForm: RejectFormReducer
 });
