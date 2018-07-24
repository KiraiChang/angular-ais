import { Entry } from '../../../model/accounting/entry.model';

export interface EntryListState {
  entryList: Entry[];
  isLoading: boolean;
}
