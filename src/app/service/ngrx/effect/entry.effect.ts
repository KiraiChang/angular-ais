import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';

import { map, mergeMap, delay } from 'rxjs/operators';

import { IEntryRepository } from '../../../repository/ientry.repository';

import * as EntryListAction from '../action/entry-list.action';
export type AllAction = EntryListAction.EntryListAction;

@Injectable()
export class EntryListEffects {
  constructor(private actions: Actions, private repository: IEntryRepository) {}

  @Effect()
  fetchEntryList: Observable<AllAction> = this.actions.pipe(
    ofType(EntryListAction.FETCH_ACCOUNT_ENTRY_LIST),
    mergeMap(() => this.repository.getList()),
    map(entryList => {
      return new EntryListAction.FetchAccountEntryListSuccess(entryList);
    }));
}
