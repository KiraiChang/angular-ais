import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store} from '@ngrx/store';

import { ITransService } from '../itrans.service';
import { EntryListState } from './state/entry-list.state';
import { Trans } from '../../model/accounting/trans.model';
import { Kind } from '../../model/accounting/kind.model';
import { FetchAccountEntryList } from './action/entry-list.action';

@Injectable({
  providedIn: 'root'
})
export class TransService implements ITransService {

  constructor(private store: Store<EntryListState>) { }

  public getList(): Observable<Trans[]> {
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
          .sort((a, b) => (a.id > b.id) ? 1 : ((b.idx > a.idx) ? -1 : 0))
          .filter((item, index, array) => array.findIndex(item2 => item2.id === item.id) === index)
      ));
  }
}
