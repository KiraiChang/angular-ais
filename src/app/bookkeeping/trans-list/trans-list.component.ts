import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import {Observable} from 'rxjs';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';

import { ITransService } from '../../service/itrans.service';
import { Trans } from '../../model/accounting/trans.model';

@Component({
  selector: 'app-trans-list',
  templateUrl: './trans-list.component.html',
  styleUrls: ['./trans-list.component.css']
})
export class TransListComponent implements OnInit, OnDestroy {
  newTransId: number;
  transList$: Observable <Trans []>;
  subscription: Subscription | null;
  dataSource: MatTableDataSource<Trans> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'desc', 'date', 'amount', 'operator'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private transService: ITransService) { }

  ngOnInit() {
    this.subscription = this.transService.getList().subscribe(data => {
      this.dataSource.data = data;
      this.newTransId = data.length;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onApplyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
