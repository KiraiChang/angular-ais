import * as TransListAction from '../action/trans-list.action';

import { Kind } from '../../../model/accounting/kind.model';
import { TransListState } from '../state/trans-list.state';

const initialState: TransListState = {
  transList : [
      { id: '0', date: '2018/04/07', desc: 'test1', amount: 2000 },
    ],
  isLoading: false
};


export function transListReducer(state = initialState, action: TransListAction.TransListAction): TransListState {
  switch (action.type) {
    case TransListAction.FETCH_ACCOUNT_TRANS_LIST:
    return {
      ...state,
      isLoading: true
    };
  case TransListAction.FETCH_ACCOUNT_TRANS_LIST_SUCCESS:
    if (action.payload.length === 0) {
      action.payload = state.transList;
    }
    return {
      isLoading: false,
      transList: action.payload
    };
    case TransListAction.UPSERT_ACCOUNT_TRANS:
      const removedList = state.transList.filter((item) => item.id !== action.payload.id);
      return {
        transList: [...removedList, action.payload],
        isLoading: false
      };
    default:
      return state;
  }
}
