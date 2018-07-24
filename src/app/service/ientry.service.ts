import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entry } from '../model/accounting/entry.model';
import { Trans } from '../model/accounting/trans.model';
import { Kind } from '../model/accounting/kind.model';

@Injectable({
  providedIn: 'root'
})
export abstract class IEntryService {

  public abstract getList(): Observable<Entry[]>;

  public abstract upsertEntriesAdapter(entries: Entry[]): void;

  public upsertEntries(entries: Entry[]) {
    if (this.isEntriesValidate(entries)) {
      this.upsertEntriesAdapter(entries);
    }
  }

  public isEntriesValidate(entries: Entry[]): boolean {
    if (entries.length <= 0) {
      return false;
    }
    const debitAmount = entries.filter((item) => item === null ? false : +item.kind === Kind.Debit)
      .map((item) => item.amount)
      .reduce((item, total) => total + item, 0);
    const creditAmount = entries.filter((item) => item === null ? false : +item.kind === Kind.Credit)
      .map((item) => item.amount)
      .reduce((item, total) => total + item, 0);
    return debitAmount === +creditAmount;
  }
}
