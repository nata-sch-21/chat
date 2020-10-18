import { ActionType, createReducer } from 'typesafe-actions';

import * as actions from '../actions';
import { GlobalState, User } from '../types';

export const USER_NS = 'user';

type UserActions = ActionType<typeof actions>;

export interface UserState {
  user: User | null;
}

const initialState = {
  user: null,
};

export const selectUser = (state: GlobalState): User | null =>
  state[USER_NS].user;

export const userReducer = createReducer<UserState, UserActions>(initialState, {
  SET_USER: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
});
