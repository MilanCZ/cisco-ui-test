import React, { PureComponent } from 'react';

import styles from './EmployeesTable.css';

class EmployeesWithError extends PureComponent {
  render() {
    const { employees } = this.props;
    const result = employees && employees.result ? employees.result : null;

    if (result && result.size && result.size > 0) {
      return (
        <div className={styles.employeesTable}>
          <h1>This should catch by ErrorBoundary</h1>
          {result.something_not_existed.get('something_not_existed')}
        </div>
      );
    }
    return <div />;
  }
}

export default EmployeesWithError;
