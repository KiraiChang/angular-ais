import { Action } from '@ngrx/store';

import { Trans } from '../../../model/accounting/trans.model';

export const UPSERT_ACCOUNT_TRANS = 'UPSERT_ACCOUNT_TRANS';
export const FETCH_ACCOUNT_TRANS_LIST = 'FETCH_ACCOUNT_TRANS_LIST';
export const FETCH_ACCOUNT_TRANS_LIST_SUCCESS = 'FETCH_ACCOUNT_TRANS_LIST_SUCCESS';

export class UpsertAccountTrans implements Action {
  readonly type = UPSERT_ACCOUNT_TRANS;
  constructor(public payload: Trans) {}
}

export class FetchAccountTransList implements Action {
  readonly type = FETCH_ACCOUNT_TRANS_LIST;
  constructor() {}
}

export class FetchAccountTransListSuccess implements Action {
  readonly type = FETCH_ACCOUNT_TRANS_LIST_SUCCESS;
  constructor(public payload: Trans []) {}
}
export type TransListAction = UpsertAccountTrans | FetchAccountTransList | FetchAccountTransListSuccess;
