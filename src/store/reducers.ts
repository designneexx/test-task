import { Word } from '../api/interfaces';
import { LOAD, ADD, REMOVE, REORDER } from './actions';
import { FavoriteActions } from './interfaces';

export const favoriteReducer = (favorites: Word[] = [], action: FavoriteActions) => {
  switch (action.type) {
    case LOAD:
      return action.payload;
    case REORDER:
      const { source, destination } = action.payload;
      const newFavorites = [...favorites];
      const [reorderedFavorite] = newFavorites.splice(source, 1);

      newFavorites.splice(destination, 0, reorderedFavorite);

      return newFavorites;
    case ADD:
      const { payload } = action;
      return favorites.includes(payload) ? favorites : [...favorites, payload];
    case REMOVE:
      return favorites.filter(({ word }) => word !== action.payload.word);
    default:
      return favorites;
  }
};
