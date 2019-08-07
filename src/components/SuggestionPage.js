import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Rows, Col } from 'react-native-table-component';
 
class SuggestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableTitle: ['Suggestion'],
      tableData: [
        [this.props.suggestion]
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
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 60, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 40 },
  text: { textAlign: 'center' }
});

export default SuggestionPage;

