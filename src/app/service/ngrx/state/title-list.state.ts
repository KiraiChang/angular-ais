import { Title } from '../../../model/accounting/title.model';

export interface TitleListState {
  titleList: Title[];
  isLoading: boolean;
}
