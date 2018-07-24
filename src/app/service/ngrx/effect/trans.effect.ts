import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';

import { map, mergeMap, delay } from 'rxjs/operators';

import { ITransRepository } from '../../../repository/itrans.repository';

import * as TransListAction from '../action/trans-list.action';
export type AllAction = TransListAction.TransListAction;

@Injectable()
export class TransListEffects {
  constructor(private actions: Actions, private repository: ITransRepository) {}

  @Effect()
  fetchTransList: Observable<AllAction> = this.actions.pipe(
    ofType(TransListAction.FETCH_ACCOUNT_TRANS_LIST),
    mergeMap(() => this.repository.getList()),
    map(transList => {
      return new TransListAction.FetchAccountTransListSuccess(transList);
    }));
}
