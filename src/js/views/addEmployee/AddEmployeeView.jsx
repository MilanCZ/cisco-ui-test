import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// This is i18n and i10n
import { FormattedMessage } from 'react-intl'

import { actions as employeesActions } from '../../redux/modules/employees'
import { employeesSelector } from '../../redux/selectors/employeesSelector'

class AddEmployeeView extends Component {
  static propTypes = {
    employees: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { getEmployees } = this.props

    getEmployees()
  }

  render() {
    const { employees, getEmployees } = this.props;

    return (
      <Fragment>
        <h2>
          <FormattedMessage id="employees.add" />
        </h2>


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
)(AddEmployeeView)
