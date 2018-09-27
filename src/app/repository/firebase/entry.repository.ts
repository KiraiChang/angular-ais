import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, mergeMap, delay } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Entry } from '../../model/accounting/entry.model';

import { IEntryRepository } from '../ientry.repository';

@Injectable({
  providedIn: 'root'
})
export class EntryRepository implements IEntryRepository {
  private itemsCollection: AngularFirestoreCollection<Entry>;
  items: Observable<Entry[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection('test-accounting').doc('accounting')
      .collection<Entry>('entry-list');
    this.items = this.itemsCollection.valueChanges();
   }

  public upsertEntries(entries: Entry []) {
    entries.forEach((value, index, array) => {
      if (value.guid === '') {
        value.guid = this.afs.createId();
      }
      this.itemsCollection.doc<Entry>(value.guid).set(value);
    });
  }

  public getList(): Observable<Entry []> {
    return this.items;
  }
}
