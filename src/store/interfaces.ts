import { Word } from '../api/interfaces';
import { Load, Remove, Add, Reorder } from './actions';

export interface Action<U, T> {
  type: U;
  payload: T;
}

interface PayloadOrderAction {
  destination: number;
  source: number;
}

export type LoadAction = Action<Load, Word[]>;
export type ReorderAction = Action<Reorder, PayloadOrderAction>;
export type AddAction = Action<Add, Word>;
export type RemoveAction = Action<Remove, Word>;

export type FavoriteActions = LoadAction | ReorderAction | AddAction | RemoveAction;
