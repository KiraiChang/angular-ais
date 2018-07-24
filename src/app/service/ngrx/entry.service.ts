import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store} from '@ngrx/store';

import { EntryListState } from './state/entry-list.state';
import { Entry } from '../../model/accounting/entry.model';

import { IEntryService } from '../ientry.service';
import { IEntryRepository } from '../../repository/ientry.repository';
import * as entryListAction from './action/entry-list.action';
import { FetchAccountEntryList } from './action/entry-list.action';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends IEntryService {

  constructor(private entryStore: Store<EntryListState>,
              private entryRepository: IEntryRepository) {
    super();
  }

  public getList(): Observable<Entry []> {
    this.entryStore.dispatch(new FetchAccountEntryList());
    return this.entryStore.pipe(select('entryListState'),
      map(x =>
        x.entryList
      ));
  }

  public upsertEntriesAdapter(entries: Entry[]): void {
    const transId = entries[0].transId;
    this.entryStore.dispatch(new entryListAction.UpsertAccountEntryList(
      entries, transId
    ));
    this.entryRepository.upsertEntries(entries);
  }
}
