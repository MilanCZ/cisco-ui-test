import { createAction, handleActions } from 'redux-actions'

import type { employeesType } from '../../common/types/employees'

const GET_EMPLOYEES = 'app/home/GET_EMPLOYEES'
const RETRIEVED_EMPLOYEES = 'app/home/RETRIEVED_EMPLOYEES'

export const constants = {
  GET_EMPLOYEES,
  RETRIEVED_EMPLOYEES,
}

// ------------------------------------
// Actions
// ------------------------------------
export const getEmployees = createAction(GET_EMPLOYEES, (commands) => commands)
export const retrievedEmployees = createAction(
  RETRIEVED_EMPLOYEES,
  (employees: employeesType) => employees,
)

export const actions = {
  getEmployees,
  retrievedEmployees,
}

export const reducers = {
  [RETRIEVED_EMPLOYEES]: (state, { payload }) => payload,
}

export const initialState = () => ({
  employeeList: [],
})

export default handleActions(reducers, initialState())
