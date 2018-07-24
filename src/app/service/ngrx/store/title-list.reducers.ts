import * as TitleListAction from '../action/title-list.action';
import {TitleListState} from '../state/title-list.state';

const initialState: TitleListState = {
  titleList : [
    {id: '1000', name: 'Assets'},
    {id: '2000', name: 'Liability'},
    {id: '3000', name: 'Equity'},
    {id: '4000', name: 'Income'},
    {id: '5000', name: 'Cost'},
    ],
  isLoading: false
};

export function titleListReducer(state = initialState, action: TitleListAction.TitleListAction): TitleListState {
  switch (action.type) {
    case TitleListAction.FETCH_ACCOUNT_TITLE_LIST:
    return {
      ...state,
      isLoading: true
    };
  case TitleListAction.FETCH_ACCOUNT_TITLE_LIST_SUCCESS:
    if (action.payload.length === 0) {
      action.payload = state.titleList;
    }
    return {
      isLoading: false,
      titleList: action.payload
    };
    case TitleListAction.UPSERT_ACCOUNT_TITLE:
      const removed = state.titleList.filter((item) => item.id !== action.payload.id);
      return {
        titleList: [...removed, action.payload],
        isLoading: false,
      };
    default:
      return state;
  }
}
