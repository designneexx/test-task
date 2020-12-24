import { createContext, Dispatch, useContext } from 'react';
import { Word } from '../api/interfaces';
import { FavoriteActions } from './interfaces';

export * from './interfaces';
export * from './reducers';
export * from './actions';

export type FavoritesStore = [Word[], Dispatch<FavoriteActions>];

export const FavoritesContext = createContext<FavoritesStore | null>(null);

export const useFavorites = (): FavoritesStore => useContext(FavoritesContext) as FavoritesStore;
