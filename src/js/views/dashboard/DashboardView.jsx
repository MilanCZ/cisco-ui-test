import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// This is i18n and i10n
import { FormattedMessage } from 'react-intl'

import ReactMinimalPieChart from 'react-minimal-pie-chart'

import { actions as employeesActions } from '../../redux/modules/employees'
import { employeesSelector } from '../../redux/selectors/employeesSelector'
import EmployeesTable from '../../common/components/EmployeesTable/EmployeesTable'
import type { employeeType } from '../../common/types/employees'

import styles from './DashboardView.css'

class DashboardView extends Component {
  static propTypes = {
    employees: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    document.title = 'Dashboard'
  }

  componentDidMount() {
    const { getEmployees } = this.props

    getEmployees()
  }

  aggregateEmployeeData(data: employeeType[], field: string) {
    if (!data || data.length === 0) {
      return []
    }

    const colors = ['#7D3C98', '#FA8072', '#0000FF', '#00DB4C', '#34495E', '#5F6A6A', '#0B5345']

    const map = new Map()
    const getOrMake = (obj, newValueCb) => obj || newValueCb()

    data.reduce((map, current) => {
      const value = current[field]

      const group = getOrMake(map.get(value), () => {
        const newGroup = {
          title: value,
          value: 0,
        }
        map.set(value, newGroup)
        return newGroup
      })
      group.value += 1
      return map
    }, map)

    return Array.from(map.values())
      .sort((grpA, grpB) => (grpA.title > grpB.title ? -1 : 1))
      .map((grp, i) => ({
        ...grp,
        color: colors[i % colors.length],
      }))
  }

  render() {
    const { employees, getEmployees, history } = this.props

    const dataForPieChart = this.aggregateEmployeeData(employees.employeeList, 'jobTitle')

    return (
      <Fragment>
        <h2>
          <FormattedMessage id="employees.header"/>
        </h2>

        <div className={styles.buttonPanel}>
          <button type="button" onClick={() => history.push('/addEmployee')}>
            <FormattedMessage id="employees.add"/>
          </button>
        </div>


        <EmployeesTable data={employees} refreshFn={getEmployees}/>
        <div className={styles.charts}>
          <div className={styles.pieChartContainer}>
            <h3><FormattedMessage id="employees.byJobTitle"/></h3>
            <ReactMinimalPieChart
              animate={false}
              animationDuration={500}
              animationEasing="ease-out"
              cx={50}
              cy={50}
              data={dataForPieChart}
              label={(labelProps) => labelProps.data[labelProps.dataIndex].title}
              labelPosition={60}
              labelStyle={{
                fontSize: '3',
              }}
              lengthAngle={360}
              lineWidth={20}
              startAngle={0}
            />
          </div>
          <div className={styles.barChartContainer}>
            <h3><FormattedMessage id="employees.byGender"/></h3>
          </div>
        </div>

      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  employees: employeesSelector(state),
})

const mapDispatchToProps = {
  ...employeesActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardView)
