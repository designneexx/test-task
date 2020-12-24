import { PENDING, REJECTED, RESOLVED } from './staticData';

export interface WordFilter {
  value: string;
  label: string;
}

export type State = typeof PENDING | typeof REJECTED | typeof RESOLVED;
