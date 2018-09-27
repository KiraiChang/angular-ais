import { MinValueValidatorDirective } from './directive/min-value-validator.directive';
import { EntryListEffects } from './service/ngrx/effect/entry.effect';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { titleListReducer } from './service/ngrx/store/title-list.reducers';
import { TitleListComponent } from './bookkeeping/title-list/title-list.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { EntryListComponent } from './bookkeeping/entry-list/entry-list.component';
import { entryListReducer } from './service/ngrx/store/entry-list.reducers';

import { TransListComponent } from './bookkeeping/trans-list/trans-list.component';

import { ITitleService } from './service/ititle.service';
import { IEntryService } from './service/ientry.service';
import { ITransService } from './service/itrans.service';
import { TitleService } from './service/ngrx/title.service';
import { EntryService } from './service/ngrx/entry.service';
import { TransService } from './service/ngrx/trans.service';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,
          MatButtonModule,
          MatSidenavModule,
          MatIconModule,
          MatListModule,
          MatTableModule,
          MatFormFieldModule,
          MatInputModule,
          MatPaginatorModule,
          MatGridListModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MAT_DATE_LOCALE,
          MAT_DATE_FORMATS,
          MatSelectModule,
          MatSortModule} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ITitleRepository } from './repository/ititle.repository';
import { IEntryRepository } from './repository/ientry.repository';
import { TitleRepository } from './repository/firebase/title.repository';
import { EntryRepository } from './repository/firebase/entry.repository';
import { TitleListEffects } from './service/ngrx/effect/title.effect';

@NgModule({
  declarations: [
    AppComponent,
    TitleListComponent,
    EntryListComponent,
    TransListComponent,
    MainNavComponent,
    MinValueValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({titleListState: titleListReducer, entryListState: entryListReducer}),
    EffectsModule.forRoot([EntryListEffects, TitleListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-ais'),
    AngularFirestoreModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: ITitleService, useClass: TitleService },
    { provide: IEntryService, useClass: EntryService },
    { provide: ITransService, useClass: TransService },
    { provide: ITitleRepository, useClass: TitleRepository },
    { provide: IEntryRepository, useClass: EntryRepository },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
