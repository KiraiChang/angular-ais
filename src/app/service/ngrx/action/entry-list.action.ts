import { Action } from '@ngrx/store';

import { Entry } from '../../../model/accounting/entry.model';

export const UPSERT_ACCOUNT_ENTRY_LIST = 'UPSERT_ACCOUNT_ENTRY_LIST';
export const FETCH_ACCOUNT_ENTRY_LIST = 'FETCH_ACCOUNT_ENTRY_LIST';
export const FETCH_ACCOUNT_ENTRY_LIST_SUCCESS = 'FETCH_ACCOUNT_ENTRY_LIST_SUCCESS';

export class UpsertAccountEntryList implements Action {
  readonly type = UPSERT_ACCOUNT_ENTRY_LIST;
  constructor(public payload: Entry [],
              public transId: string) {}
}

export class FetchAccountEntryList implements Action {
  readonly type = FETCH_ACCOUNT_ENTRY_LIST;
  constructor() {}
}

export class FetchAccountEntryListSuccess implements Action {
  readonly type = FETCH_ACCOUNT_ENTRY_LIST_SUCCESS;
  constructor(public payload: Entry []) {}
}

export type EntryListAction = UpsertAccountEntryList | FetchAccountEntryList | FetchAccountEntryListSuccess;
