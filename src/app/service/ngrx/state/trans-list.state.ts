import { Trans } from '../../../model/accounting/trans.model';

export interface TransListState {
  transList: Trans[];
  isLoading: boolean;
}
