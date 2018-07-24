import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store} from '@ngrx/store';

import { ITransService } from '../itrans.service';
import { ITransRepository } from '../../repository/itrans.repository';
import { EntryListState } from './state/entry-list.state';
import { Trans } from '../../model/accounting/trans.model';
import { Kind } from '../../model/accounting/kind.model';
import { FetchAccountEntryList } from './action/entry-list.action';
import { TransListState } from './state/trans-list.state';
import * as transListAction from './action/trans-list.action';

@Injectable({
  providedIn: 'root'
})
export class TransService implements ITransService {

  constructor(private store: Store<EntryListState>,
              private transRepository: ITransRepository) { }

  public getList(): Observable<Trans[]> {
    // this.store.dispatch(new transListAction.FetchAccountTransList());
    // return this.store.pipe(select('transListState'),
    // map(x => x.transList));
    this.store.dispatch(new FetchAccountEntryList());
    return this.store.pipe(select('entryListState'),
      map(x =>
        x.entryList
          .map((item, index, array) => ({
            idx: item.id,
            id: item.transId,
            desc: item.desc,
            date: item.date,
            amount: array.filter(item2 => item2.transId === item.transId && item2.kind === Kind.Credit)
                          .map(item2 => item2.amount)
                          .reduce((amount, total) => total + amount)
          }))
          .filter((item, index, array) => item.idx === 0 && array.findIndex(item2 => item2.id === item.id) === index)
      ));
  }

  public upsert(trans: Trans): void {
    // this.store.dispatch(new transListAction.UpsertAccountTrans(
    //   {id: trans.id, desc: trans.desc, date: trans.date, amount: trans.amount}
    // ));
    // this.transRepository.upsert(trans);
  }
}
