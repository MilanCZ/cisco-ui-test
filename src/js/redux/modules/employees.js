import { createAction, handleActions } from 'redux-actions'

import type { employeesType } from '../../common/types/employees'

const GET_EMPLOYEES = 'app/dashboard/GET_EMPLOYEES'
const RETRIEVED_EMPLOYEES = 'app/dashboard/RETRIEVED_EMPLOYEES'
const ADD_EMPLOYEE = 'app/dashboard/ADD_EMPLOYEE'

export const constants = {
  GET_EMPLOYEES,
  RETRIEVED_EMPLOYEES,
  ADD_EMPLOYEE,
}

// ------------------------------------
// Actions
// ------------------------------------
export const getEmployees = createAction(GET_EMPLOYEES, (commands) => commands)
export const retrievedEmployees = createAction(
  RETRIEVED_EMPLOYEES,
  (employees: employeesType) => employees,
)
export const addEmployee = createAction(ADD_EMPLOYEE, (employee) => employee)

export const actions = {
  getEmployees,
  retrievedEmployees,
  addEmployee,
}

export const reducers = {
  [RETRIEVED_EMPLOYEES]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
  }),
  [GET_EMPLOYEES]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: true,
  }),
}


export const initialState = () => ({
  employeeList: [],
  loading: false,
})

export default handleActions(reducers, initialState())
