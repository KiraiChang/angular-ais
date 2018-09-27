import * as EntryListAction from '../action/entry-list.action';

import { Kind } from '../../../model/accounting/kind.model';
import {EntryListState} from '../state/entry-list.state';

const initialState: EntryListState = {
  entryList : [

    ],
  isLoading: false
};


export function entryListReducer(state = initialState, action: EntryListAction.EntryListAction): EntryListState {
  switch (action.type) {
    case EntryListAction.FETCH_ACCOUNT_ENTRY_LIST:
      return {
        ...state,
        isLoading: true
      };
    case EntryListAction.FETCH_ACCOUNT_ENTRY_LIST_SUCCESS:
      if (action.payload.length === 0) {
        action.payload = state.entryList;
      }
      return {
        isLoading: false,
        entryList: action.payload
      };
    case EntryListAction.UPSERT_ACCOUNT_ENTRY_LIST:
      const removedList = state.entryList.filter((item) => item.transId !== action.transId);
      return {
        entryList:  [...removedList, ...action.payload],
        isLoading: false
      };
    default:
      return state;
  }
}

