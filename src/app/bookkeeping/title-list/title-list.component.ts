import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';


import { IEntryService } from '../../service/ientry.service';
import { ITitleService} from '../../service/ititle.service';
import { Title } from '../../model/accounting/title.model';
import { Kind } from '../../model/accounting/kind.model';

interface TitleAmount {
  id: string;
  debit: number;
  credit: number;
}

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.css']
})
export class TitleListComponent implements OnInit, OnDestroy {
  subscription: Subscription | null;
  entrySubscription: Subscription | null;
  title: Title | null;
  amountList: TitleAmount[] = [];
  dataSource: MatTableDataSource<Title> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'debit', 'credit', 'operator'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private titleService: ITitleService,
              private entryService: IEntryService) { }

  ngOnInit() {
    this.subscription = this.titleService.getList().subscribe(data => {
      this.dataSource.data = data;
      this.entrySubscription = this.entryService.getList().subscribe(entries => {
        this.amountList = data.map(item => ({
          id: item.id,
          debit: entries.filter(entry => entry.titleId === item.id && +entry.kind === Kind.Debit)
                  .map(entry2 => entry2.amount)
                  .reduce((val, total) => total + val, 0),
          credit: entries.filter(entry => entry.titleId === item.id && +entry.kind === Kind.Credit)
                  .map(entry2 => entry2.amount)
                  .reduce((val, total) => total + val, 0),
        }));
      });
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.onReset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.entrySubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.titleService.upsert(
        {id: form.value.id, name: form.value.name}
        );
    }
  }

  onSelect(id: string) {
    this.title = this.dataSource.data.filter(item => item.id === id)[0];
  }

  onReset() {
    this.title = {
      id: null,
      name: '',
    };
  }

  onAmout(title: string, kind: Kind): number {
    const amount = this.amountList.filter(item => item.id === title)[0];
    if (kind === Kind.Credit) {
      return amount == null ? 0 : amount.credit;
    } else {
      return amount == null ? 0 : amount.debit;
    }
  }

  onApplyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
