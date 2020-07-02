import { ActionType, createReducer } from 'typesafe-actions';

import * as actions from '../actions';
import { GlobalState } from '../types';

export const PING_NS = 'ping';

type PingActions = ActionType<typeof actions>;

export interface PingState {
  data: string;
  error: string | null;
  loading: boolean;
}

const initialState = {
  data: '',
  error: '',
  loading: false,
};

export const selectPingData = (state: GlobalState): string => state[PING_NS].data;
export const selectPingLoading = (state: GlobalState): boolean => state[PING_NS].loading;

export const pingReducer = createReducer<PingState, PingActions>(initialState, {
  LOAD_PING_REQUEST: (state) => ({
    ...state,
    loading: true,
  }),

  LOAD_PING_SUCCESS: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    ...payload,
  }),
  LOAD_PING_FAILURE: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
});
