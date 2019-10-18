import { put, fork, takeLatest } from 'redux-saga/effects'
import {
  constants as employeesConstants,
  actions as employeesActions,
} from '../modules/employees'
import _mockData from './new_hire.json'

import type { employeesType } from '../../common/types/employees'

const mockData = _mockData.map((employee) => ({
  ...employee,
  tenure: Number(employee.tenure),
}))

function getMockData(commands) {
  if (commands && commands.sort && commands.sort.field) {
    return [...mockData].sort((a, b) => {
      if (a[commands.sort.field] > b[commands.sort.field]) {
        return commands.sort.ascending ? 1 : -1
      } else if (a[commands.sort.field] === b[commands.sort.field]) {
        return 0
      }
      return commands.sort.ascending ? -1 : 1
    })
  }
  return mockData
}


export function* fetchEmployeesData({ payload }) {
  // pretend there is an api call
  const result: employeesType = {
    employeeList: getMockData(payload),
    ...payload,
  }

  yield put(employeesActions.retrievedEmployees(result))
}

function* watchGetEmployees() {
  yield takeLatest(employeesConstants.GET_EMPLOYEES, fetchEmployeesData)
}

export const employeesSaga = [fork(watchGetEmployees)]
