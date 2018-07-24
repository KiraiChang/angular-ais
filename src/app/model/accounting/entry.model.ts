import { Kind } from './kind.model';

export interface Entry {
  guid: string;
  id: number;
  transId: string;
  date: string;
  desc: string;
  titleId: string;
  amount: number;
  kind: Kind;
  refId: string;
}
