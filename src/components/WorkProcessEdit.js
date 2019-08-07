// import React from 'react';
// import { Text, View } from 'react-native';

// class WorkProcessEdit extends React.Component {   
//     render() {
//         console.log(this.props.workProcess);
//         return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>WORK EDIT</Text>
//         </View>
//         );
//     }
// }

// export default WorkProcessEdit;

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Rows, Col } from 'react-native-table-component';
import { connect } from 'react-redux';
import WorkProcessEditForm from './WorkProcessEditForm';
import { projectProcessUpdate } from '../actions';

class WorkProcessEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
        tableTitle: ['Name', 'Result', 'Weight', 'Score of employee'],
        tableData: [
            [this.props.workProcess.name],
            [this.props.workProcess.result],
            [this.props.workProcess.weight],
            [this.props.workProcess.score_of_employee],
        ]
        };
    }
    
    render() {
        const state = this.state;
        return (
        <View style={styles.container}>
            <Table>
                <TableWrapper style={styles.wrapper}>
                    <Col data={state.tableTitle} style={styles.title} heightArr={[40, 40]} textStyle={styles.text} />
                    <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
            <WorkProcessEditForm 
                project_id={this.props.uidProject}
                work_id={this.props.uidWork}
                assessment_name={this.props.assessmentActiveName}
                eID={this.props.eid}
            />
        </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 60, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 2, backgroundColor: '#f6f8fa' },
    row: { height: 40 },
    text: { textAlign: 'center' }
});

const mapStateToProps = (state) => {
    const { 
        assessmentActiveName,
        eid,
        uidProject,
        uidWork
    } = state.projectProcess;
    return {
        assessmentActiveName,
        eid,
        uidProject,
        uidWork
    };
};

export default connect(mapStateToProps, { 
    projectProcessUpdate
})(WorkProcessEdit);
