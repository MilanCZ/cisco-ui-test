import { reducers, constants, actions, initialState } from '../../../src/js/redux/modules/employees'
import { getStore } from '../../../__fixtures__/store'

const fixture = {
  employeeList: [{
    name: 'Mike Potts',
    jobTitle: 'CEO',
    tenure: 5,
    gender: 'Male',
  }]
}

describe('redux.modules.employees', () => {
  let store = null

  beforeEach(() => {
    store = getStore({
      employees: initialState(),
    })
  })

  afterEach(() => {
    store = null
  })

  it('should return correct state when running retrievedEmployees', () => {
    const type = constants.RETRIEVED_EMPLOYEES
    const state = store.getState().employees

    const result = reducers[type](state, { payload: fixture })

    expect(Array.isArray(result.employeeList))
      .toEqual(true)
    expect(result.employeeList)
      .toHaveLength(1)
    expect(result.employeeList[0].name)
      .toEqual(fixture.employeeList[0].name)
    expect(result.loading)
      .toEqual(false)
  })
})
