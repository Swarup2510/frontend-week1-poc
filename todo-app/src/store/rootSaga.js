import { all } from 'redux-saga/effects';
import todosSaga from './todos/sagas';

export default function* rootSaga() {
  yield all([todosSaga()]);
}
