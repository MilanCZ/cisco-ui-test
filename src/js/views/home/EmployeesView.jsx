import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styles from './EmployeesView.css'

// This is i18n and i10n
import { FormattedMessage } from 'react-intl'

import { actions as employeesActions } from '../../redux/modules/employees'
import { employeesSelector } from '../../redux/selectors/employeesSelector'

import EmployeesTable from '../../common/components/EmployeesTable/EmployeesTable'

class EmployeesView extends Component {
  static propTypes = {
    employees: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { getEmployees } = this.props

    getEmployees()
  }

  render() {
    const { employees, getEmployees, history } = this.props

    return (
      <Fragment>
        <h2>
          <FormattedMessage id="employees.header"/>
        </h2>

        <div className={styles.buttonPanel}>
          <button onClick={() => history.push('/addEmployee')}><FormattedMessage
            id="employees.add"/></button>
        </div>


        <EmployeesTable data={employees} refreshFn={getEmployees}/>

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
)(EmployeesView)
