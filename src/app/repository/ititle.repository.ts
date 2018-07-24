import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Title } from '../model/accounting/title.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ITitleRepository {
  abstract upsert(title: Title);
  abstract getList(): Observable<Title []>;
}
