import React, { PureComponent } from 'react'

import styles from './EmployeesTable.css'
import type { employeeType } from '../../types/employees'

class EmployeesTable extends PureComponent {

  renderRow(employee: employeeType, i) {
    return <tr key={i}>
      <td>{employee.name}</td>
      <td>{employee.jobTitle}</td>
      <td>{employee.tenure}</td>
      <td>{employee.gender}</td>
    </tr>
  }

  renderHeaderCell(field, label) {
    const { data: { sort } = {}, refreshFn } = this.props

    return <th>
      <a onClick={() => refreshFn({
        sort: {
          field,
          ascending: sort && sort.ascending ? !sort.ascending : true,
        },
      })}>{label} {sort && sort.field === field ? (sort.ascending ? '↓' : '↑') : null}</a>
    </th>
  }

  render() {
    const {
      data: { employeeList = [], loading = false } = {
        employeeList: [],
        loading: false,
      },
    } = this.props

    if (employeeList) {
      return (
        <div className={styles.employeesTable}>
          <div className={styles.loading}>{loading ? 'Loading...' : null}</div>
          <table>
            <thead>
            <tr>
              {this.renderHeaderCell('name', 'Name')}
              {this.renderHeaderCell('jobTitle', 'Job Title')}
              {this.renderHeaderCell('tenure', 'Tenure')}
              {this.renderHeaderCell('gender', 'Gender')}
            </tr>
            </thead>
            <tbody>
            {employeeList.map(this.renderRow)}
            </tbody>
          </table>
        </div>
      )
    }
    return <div/>
  }
}

export default EmployeesTable
