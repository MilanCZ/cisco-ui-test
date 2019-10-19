import { put } from 'redux-saga/effects'
import { fetchEmployeesData } from '../../../src/js/redux/sagas/employeesSaga'
import { actions as employeesActions } from '../../../src/js/redux/modules/employees'

describe('redux.sagas.employeesSaga', () => {
  describe('fetchEmployeesData', () => {

    const fixture = {
        employeeList: [{
          name: 'Mike Potts',
          jobTitle: 'CEO',
          tenure: 5,
          gender: 'Male',
        }],
    }

    it('should call employeesActions.retrievedEmployees with correct data', () => {
      const generator = fetchEmployeesData({payload:{}})

      let next = generator.next()
      expect(next.value.type).toEqual("CALL")

      next = generator.next({body: fixture.employeeList})

      expect(next.value)
        .toEqual(put(employeesActions.retrievedEmployees(fixture)))
    })
  })
})
