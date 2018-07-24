import { Action } from '@ngrx/store';

import { Title } from '../../../model/accounting/title.model';

export const UPSERT_ACCOUNT_TITLE = 'UPSERT_ACCOUNT_TITLE';
export const FETCH_ACCOUNT_TITLE_LIST = 'FETCH_ACCOUNT_TITLE_LIST';
export const FETCH_ACCOUNT_TITLE_LIST_SUCCESS = 'FETCH_ACCOUNT_TITLE_LIST_SUCCESS';

export class UpsertAccountTitle implements Action {
  readonly type = UPSERT_ACCOUNT_TITLE;
  constructor(public payload: Title) {}
}

export class FetchAccountTitleList implements Action {
  readonly type = FETCH_ACCOUNT_TITLE_LIST;
  constructor() {}
}

export class FetchAccountTitleListSuccess implements Action {
  readonly type = FETCH_ACCOUNT_TITLE_LIST_SUCCESS;
  constructor(public payload: Title []) {}
}

export type TitleListAction = UpsertAccountTitle | FetchAccountTitleList | FetchAccountTitleListSuccess;
