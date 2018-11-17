import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { ITitleRepository } from '../ititle.repository';
import { Title } from '../../model/accounting/title.model';

@Injectable({
  providedIn: 'root'
})
export class TitleRepository implements ITitleRepository {
  private itemsCollection: AngularFirestoreCollection<Title>;
  items: Observable<Title[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection('test-accounting').doc('accounting').collection<Title>('title-list');
    this.items = this.itemsCollection.valueChanges();
   }

  public upsert(title: Title) {
    this.itemsCollection.doc<Title>(title.id).set(title);
  }

  public getList(): Observable<Title []> {
    return this.items;
  }
}
