import { all } from 'redux-saga/effects';
import { employeesSaga } from './employeesSaga';

export default function* sagas() {
  yield all([...employeesSaga]);
}
