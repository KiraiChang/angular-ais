import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ITransRepository } from '../itrans.repository';

import { Trans } from '../../model/accounting/trans.model';

@Injectable({
  providedIn: 'root'
})
export class TransRepository implements ITransRepository {
  private itemsCollection: AngularFirestoreCollection<Trans>;
  items: Observable<Trans[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection('test-accounting').doc('accounting').collection<Trans>('trans-list');
    this.items = this.itemsCollection.valueChanges();
   }

  public upsert(title: Trans) {
    this.itemsCollection.doc<Trans>(title.id).set(title);
  }

  public getList(): Observable<Trans []> {
    return this.items;
  }
}
