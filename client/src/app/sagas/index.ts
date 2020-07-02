import { spawn, all } from 'redux-saga/effects';

import { handleFetchPing } from './ping';

export function* pingSaga() {
  yield all([spawn(handleFetchPing)]);
}

// prettier-ignore
export const sagas = [
  pingSaga,
];
