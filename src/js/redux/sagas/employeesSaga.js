import { put, fork, takeLatest, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import superagent from 'superagent'

import {
  constants as employeesConstants,
  actions as employeesActions,
} from '../modules/employees'

const apiCallToFetchEmployees = (payload) => {
  const baseRequest = superagent.get(__CONFIG__.backend + 'employeeList')
  if (payload && payload.sort && payload.sort.field) {
    return baseRequest
      .query({
        _sort: payload.sort.field,
        _order: payload.sort.ascending ? 'asc' : 'desc',
      })
  }
  return baseRequest
}

const addId = (employee) => ({
  ...employee,
  id: Math.round(Math.random() * 1000000),
})

const apiCallToAddEmployee = (payload) => {
  return superagent.post(__CONFIG__.backend + 'employeeList')
    .set('Content-Type', 'application/json')
    .send(addId(payload))
}

export function* fetchEmployeesData({ payload }) {
  const response = yield call(apiCallToFetchEmployees, payload)
  yield put(employeesActions.retrievedEmployees({ employeeList: response.body }))
}

export function* addEmployeeData({ payload }) {
  yield call(apiCallToAddEmployee, payload)
  yield put(push('/'))
}

function* watchGetEmployees() {
  yield takeLatest(employeesConstants.GET_EMPLOYEES, fetchEmployeesData)
}

function* watchAddEmployees() {
  yield takeLatest(employeesConstants.ADD_EMPLOYEE, addEmployeeData)
}

export const employeesSaga = [fork(watchAddEmployees), fork(watchGetEmployees)]
