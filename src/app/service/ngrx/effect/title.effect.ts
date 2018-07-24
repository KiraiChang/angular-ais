import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';

import { map, mergeMap, delay } from 'rxjs/operators';

import { ITitleRepository } from '../../../repository/ititle.repository';

import * as TitleListAction from '../action/title-list.action';
export type AllAction = TitleListAction.TitleListAction;

@Injectable()
export class TitleListEffects {
  constructor(private actions: Actions, private repository: ITitleRepository) {}

  @Effect()
  fetchTitleList: Observable<AllAction> = this.actions.pipe(
    ofType(TitleListAction.FETCH_ACCOUNT_TITLE_LIST),
    mergeMap(() => this.repository.getList()),
    map(titleList => {
      return new TitleListAction.FetchAccountTitleListSuccess(titleList);
    }));
}
