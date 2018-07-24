import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { select, Store} from '@ngrx/store';

import { ITitleService } from '../ititle.service';
import { ITitleRepository } from '../../repository/ititle.repository';
import { Title } from '../../model/accounting/title.model';
import { TitleListState } from './state/title-list.state';
import * as titleListAction from './action/title-list.action';

@Injectable({
  providedIn: 'root'
})
export class TitleService implements ITitleService {

  constructor(private store: Store<TitleListState>,
              private titleRepository: ITitleRepository) { }

  public upsert(title: Title) {
    this.store.dispatch(new titleListAction.UpsertAccountTitle(
      {id: title.id, name: title.name}
    ));
    this.titleRepository.upsert(
      {id: title.id, name: title.name}
      );
  }

  public getList(): Observable<Title []> {
    this.store.dispatch(new titleListAction.FetchAccountTitleList());
    return this.store.pipe(select('titleListState'),
      map(x => x.titleList));
  }
}
