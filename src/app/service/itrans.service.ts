import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Trans } from '../model/accounting/trans.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ITransService {

  public abstract getList(): Observable<Trans[]>;
}
