import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// This is i18n and i10n
import { FormattedMessage } from 'react-intl'

import { addEmployee } from '../../redux/modules/employees'

import styles from './AddEmployeeView.css'

class AddEmployeeView extends Component {

  validators = { // false when ok, otherwise give a string with description
    name: (val) => {
      if (!val) {
        return 'Cannot be empty'
      }
      if (!val.match(/\w+ \w+/)) {
        return 'Must contain at least name and surname'
      }
      return false
    },
    jobTitle: (val) => {
      if (!val) {
        return 'Cannot be empty'
      }
      return false
    },
    tenure: (val) => {
      if (val < 1) {
        return 'Must be greater than zero'
      }
      return false
    },
    gender: (val) => {
      if (!val) {
        return 'Cannot be empty'
      }
      return false
    },
  }

  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showValidationError = this.showValidationError.bind(this)
    this.checkForErrors = this.checkForErrors.bind(this)
    this.runAllValidations = this.runAllValidations.bind(this)

    this.state = {
      values: {
        name: '',
        jobTitle: '',
        tenure: '',
        gender: '',
      },
      validationErrors: {},
    }
    document.title = 'Add Employee Form'
  }

  runAllValidations(callback = null): void {
    const { values } = this.state
    const scan = {}
    Object.getOwnPropertyNames(this.validators)
      .forEach(key => {
        scan[key] = this.validators[key](values[key])
      })
    this.setState({ validationErrors: scan }, callback)
  }

  handleChange(event) {
    const { values, validationErrors } = this.state
    const { target: { id, value } } = event
    this.setState({
      values: Object.assign({}, values, { [id]: value }),
      validationErrors: Object.assign({}, validationErrors, { [id]: this.validators[id](value) }),
    })
  }

  handleChangeNumber(event) {
    const { values, validationErrors } = this.state
    const { target: { id, value } } = event
    const converted = Number(value)
    if (!Number.isNaN(converted)) {
      this.setState({
        values: Object.assign({}, values, { [id]: converted }),
        validationErrors: Object.assign({}, validationErrors, { [id]: this.validators[id](value) }),
      })
    }

  }

  handleSubmit() {
    this.runAllValidations(() => {
      if (!this.checkForErrors()) {
        const { addEmployee } = this.props
        const { values } = this.state
        addEmployee(values)
      }
    })
  }

  showValidationError(field) {
    const { validationErrors } = this.state
    const validationError = validationErrors[field]
    return validationError ?
      <span className={styles.validationError}>{validationError}</span> : null
  }

  checkForErrors() {
    const { validationErrors: { name, jobTitle, tenure, gender } } = this.state
    if (name || jobTitle || tenure || gender) {
      return true
    }

    return false
  }

  render() {
    const { history } = this.props
    const { values: { name, jobTitle, tenure, gender } } = this.state

    return (
      <Fragment>
        <h2>
          <FormattedMessage id="employees.add"/>
        </h2>

        <div className={styles.form}>
          <div className={styles.labels}>
            <label htmlFor="name"><FormattedMessage id="employees.name"/>: </label>
            <label htmlFor="jobTitle"><FormattedMessage id="employees.jobTitle"/>: </label>
            <label htmlFor="tenure"><FormattedMessage id="employees.tenure"/>: </label>
            <label htmlFor="gender"><FormattedMessage id="employees.gender"/>: </label>
          </div>
          <div className={styles.inputs}>
            <input type="text" id="name" value={name}
                   onChange={this.handleChange}
            />{this.showValidationError('name')}<br/>
            <input type="text" id="jobTitle" value={jobTitle}
                   onChange={this.handleChange}
            />{this.showValidationError('jobTitle')}<br/>
            <input type="text" id="tenure" value={tenure}
                   onChange={this.handleChangeNumber}
            />{this.showValidationError('tenure')}<br/>
            <input type="text" id="gender" value={gender}
                   onChange={this.handleChange}
            />{this.showValidationError('gender')}<br/>
          </div>
        </div>
        <button disabled={this.checkForErrors()} type="button"
                onClick={this.handleSubmit}><FormattedMessage id="submit"/></button>
        <button type="button" onClick={() => history.push('/dashboard')}><FormattedMessage
          id="addemployee.back"/></button>

      </Fragment>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  addEmployee,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEmployeeView)
