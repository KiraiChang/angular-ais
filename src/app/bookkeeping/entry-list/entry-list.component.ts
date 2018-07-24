import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSort, MatDatepicker } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

import { NgForm } from '@angular/forms';

import { Title } from '../../model/accounting/title.model';
import { Entry } from '../../model/accounting/entry.model';
import { EnumExt } from '../../extension/enumExt';
import { Kind } from '../../model/accounting/kind.model';
import { IEntryService } from '../../service/ientry.service';
import { ITitleService } from '../../service/ititle.service';
import { ITransService } from '../../service/itrans.service';
import { DropDownItem } from '../../model/dropdownitem.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EntryListComponent implements OnInit, OnDestroy {
  entrySubscription: Subscription | null;
  titleSubscription: Subscription | null;
  transId: string;
  isEntryValidate: boolean | false;

  titles$: Observable<Title[]>;

  titles: Title[];
  entries: Entry [];

  entry: any | null;

  dataSource: MatTableDataSource<Entry> = new MatTableDataSource();
  displayedColumns: string[] = ['transId', 'id', 'desc', 'date', 'titleId', 'amount', 'kind', 'refId', 'operator'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  kindTypes: DropDownItem[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private entryService: IEntryService,
              private transService: ITransService,
              private titleService: ITitleService
            ) {}

  ngOnInit() {
    this.transId = this.route.snapshot.paramMap.get('transId');
    this.entrySubscription = this.entryService.getList().subscribe(data => {
      this.entries = data.filter(item => item.transId === this.transId);
      this.dataSource.data = this.entries;
      this.isEntryValidate = this.entryService.isEntriesValidate(this.entries);
    });
    this.titles$ = this.titleService.getList();
    this.titleSubscription = this.titleService.getList().subscribe(data => {
      this.titles = data;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.kindTypes = this.getKindTypes();
    this.onReset();
  }

  ngOnDestroy() {
    this.entrySubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
  }

  public getKindTypes() {
    const kindTypes: DropDownItem[] = [];

    // Convert name-value pairs to KindType[]
    EnumExt.getNamesAndValues(Kind).forEach(pair => {
      kindTypes.push({ 'id': pair.value, 'name': pair.name });
    });

    return kindTypes;
  }

  onAdd(form: NgForm) {
    if (form.valid) {
      this.entries.push(
        {
          id: 0,
          guid: '',
          transId: this.transId,
          date: form.value.date.format('YYYY/MM/DD'),
          titleId: form.value.titleId,
          desc: form.value.desc,
          kind: form.value.kind,
          amount: +form.value.amount,
          refId: form.value.refId
        }
      );
      this.entries.forEach((value, index, array) => {
        value.id = index;
      });
      this.dataSource.data = this.entries;
      this.isEntryValidate = this.entryService.isEntriesValidate(this.entries);
      this.onReset();
    }
  }


  onDelete(guid: string, id: number) {
    this.entries = this.entries.filter(item => (guid === '' && item.guid !== guid) || item.id !== id);
    this.entries.forEach((value, index, array) => {
      value.id = index;
    });
    this.dataSource.data = this.entries;
    this.isEntryValidate = this.entryService.isEntriesValidate(this.entries);
  }

  onUpdate(form: NgForm) {
    if (form.valid) {
      this.entries.forEach((item, index, array) => {
        if ((form.value.guid !== '' && item.guid === form.value.guid) ||
              item.id === +form.value.id) {
                item.guid = form.value.guid;
                item.desc = form.value.desc;
                item.amount = +form.value.amount;
                item.titleId = form.value.titleId;
                item.kind = +form.value.kind;
                item.date = form.value.date.format('YYYY/MM/DD');
                item.refId = form.value.refId;
        }
      });
      this.dataSource.data = this.entries;
      this.isEntryValidate = this.entryService.isEntriesValidate(this.entries);
    }
  }

  onReset() {
    this.entry = {
      id: -1,
      transId: this.transId,
      guid: '',
      desc: '',
      titleId: '',
      kind: Kind.Credit,
      amount: 0,
      date: moment(),
      refId: null,
    };
  }

  onSelect(guid: string, id: number) {
    this.entry = this.entries
                  .filter(item =>
                    (guid !== '' && item.guid === guid) ||
                      item.id === id)
                  .map(item => ({
                    id: item.id,
                    transId: this.transId,
                    guid: item.guid,
                    desc: item.desc,
                    titleId: item.titleId,
                    kind: item.kind,
                    amount: item.amount,
                    date: moment(item.date),
                    refId: item.refId,
                  }))[0];
  }

  getTitle(id: string) {
    return this.titles.filter(item => item.id === id)
              .map(item => item.name);
  }

  getKind(id: number) {
    return this.kindTypes.find((item) => item.id === +id).name;
  }

  onSubmit() {
    if (this.entryService.isEntriesValidate(this.entries)) {
      this.entryService.upsertEntries(this.entries);
      this.transService.upsert(
        {
          id: this.entries[0].transId,
          desc: this.entries[0].desc,
          date: this.entries[0].date,
          amount: this.entries.filter(item => +item.kind === Kind.Credit)
          .map(item => item.amount).reduce((total, current) => total + current)
        }
      );
      this.router.navigate(['trans']);
    }
  }

  isValidate(): boolean {
    return this.isEntryValidate;
  }

  onApplyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
