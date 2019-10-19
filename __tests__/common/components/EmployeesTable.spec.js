import React from 'react'
import Enzyme, { shallow } from 'enzyme'

import { EmployeesTable } from '../../../src/js/common/components/EmployeesTable'

const fixture = {
  employeeList: [{
    name: 'Mike Potts',
    jobTitle: 'CEO',
    tenure: 5,
    gender: 'Male',
  }],
  loading: true
}

describe('ExampleView', () => {
  it('should render a table with no data rows', () => {
    const el = shallow(<EmployeesTable/>)

    expect(el.find('thead').length).toEqual(1)
    expect(el.find('tbody').length).toEqual(1)
    expect(el.find('th').length).toEqual(4)
    expect(el.find('td').length).toEqual(0)
  })

  it('should render a row + loading indicator', () => {
    const el = shallow(
      <EmployeesTable data={fixture} />
    )

    expect(el.find('td').length).toEqual(4)
    expect(el.find('.loading').first().text()).toEqual('Loading...')

  })
})
