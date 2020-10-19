import { ActionType, createReducer } from 'typesafe-actions';

import * as actions from '../actions';
import { GlobalState, Message } from '../types';

export const MESSAGES_NS = 'messages';

type MessagesActions = ActionType<typeof actions>;

export interface MessagesState {
  data: Message[];
}

const initialState = {
  data: [],
};

export const selectMessages = (state: GlobalState): Message[] | null =>
  state[MESSAGES_NS].data;

export const messagesReducer = createReducer<MessagesState, MessagesActions>(
  initialState,
  {
    SET_MESSAGE: (state, { payload }) => {
      return {
        ...state,
        data: [...state.data, payload],
      };
    },
  },
);
