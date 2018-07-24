import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Title } from '../model/accounting/title.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ITitleService {
  abstract upsert(title: Title);
  abstract getList(): Observable<Title []>;
}
