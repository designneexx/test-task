import React, { useReducer, useEffect } from 'react';
import SinglePage from './components/SinglePage';
import { Word } from './api/interfaces';
import { FavoritesContext } from './store';
import { favoriteReducer } from './store/reducers';

const App = () => {
  const storageFavorites = localStorage.getItem('FAVORITES');
  const initialFavorites: Word[] = (storageFavorites && JSON.parse(storageFavorites)) || [];
  const [favorites, dispatch] = useReducer(favoriteReducer, initialFavorites);

  useEffect(() => {
    localStorage.setItem('FAVORITES', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={[favorites, dispatch]}>
      <SinglePage />
    </FavoritesContext.Provider>
  );
};

export default App;
