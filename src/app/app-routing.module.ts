import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { TitleListComponent } from './bookkeeping/title-list/title-list.component';
import { TransListComponent } from './bookkeeping/trans-list/trans-list.component';
import { EntryListComponent } from './bookkeeping/entry-list/entry-list.component';

const routes: Routes = [
  { path: 'title', component: TitleListComponent },
  { path: 'trans', component: TransListComponent },
  { path: 'entry/:transId', component: EntryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
