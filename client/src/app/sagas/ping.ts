import { put, takeLatest, call } from 'redux-saga/effects';
import { loadPing } from '../actions';

const fetchPing = async () => {
  const res: Response = await fetch('api/ping');
  return await res.json();
};

function* runFetchPing() {
  try {
    const res = yield call(fetchPing);
    yield put(loadPing.success({ data: res.message }));
  } catch (error) {
    console.log(error);
    loadPing.failure(error.message);
  }
}

export function* handleFetchPing() {
  yield takeLatest(loadPing.request, runFetchPing);
}
