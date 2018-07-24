import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entry } from '../model/accounting/entry.model';

@Injectable({
  providedIn: 'root'
})
export abstract class IEntryRepository {

  public abstract getList(): Observable<Entry[]>;

  public abstract upsertEntries(entries: Entry[]): void;
}
