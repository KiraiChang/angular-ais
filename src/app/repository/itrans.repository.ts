import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Trans } from '../model/accounting/trans.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ITransRepository {

  public abstract getList(): Observable<Trans[]>;

  public abstract upsert(trans: Trans): void;
}
