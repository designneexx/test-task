import React, { FC, useState, useMemo, ChangeEvent } from 'react';
import { getDetailWord, getWords } from '../../api';
import { Word } from '../../api/interfaces';
import { ADD, REMOVE, REORDER, useFavorites } from '../../store';
import TabContent from '../TabContent';
import { filterWords } from './helpers';
import { WordFilter, State } from './interfaces';
import { checkBoxValues, PENDING, REJECTED, RESOLVED } from './staticData';
import {
  StyledButton,
  StyledContainer,
  StyledInput,
  Header,
  Title,
  Content,
  CheckboxContainer,
  Logo,
  ButtonLoad,
} from './styled';
import Checkbox from '../Checkbox';
import { OnDragEndResponder } from 'react-beautiful-dnd';

const SinglePage: FC = () => {
  const [state, setState] = useState<State>(RESOLVED);
  const [favorites, dispatch] = useFavorites();
  const [words, setWords] = useState<Word[]>([]);
  const [wordFilters, setWordFilters] = useState<WordFilter[]>([]);
  const [activeWord, setActiveWord] = useState('');
  const [query, setQuery] = useState('');
  const wordsView = useMemo(() => filterWords({ words, wordFilters, activeWord }), [
    words,
    wordFilters,
    activeWord,
  ]);
  const favoritesView = useMemo(
    () =>
      filterWords({
        words: favorites.filter(({ word }) => word.includes(query)),
        wordFilters,
        activeWord,
      }),
    [favorites, wordFilters, activeWord, query],
  );
  const [active, setActive] = useState(0);
  const isFavorite = active === 1;

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setQuery(value);

  const handleLoadWords = async () => {
    if (state === PENDING) {
      return;
    }

    setState(PENDING);

    try {
      const {
        results: { data },
      } = await getWords(query);
      const newWords = await Promise.all(data.map(getDetailWord));

      setWords(newWords);
      setState(RESOLVED);
    } catch {
      setState(REJECTED);
    }
  };

  const handleToggleOpen = (word: string) => () => {
    setActiveWord(word === activeWord ? '' : word);
  };

  const handleFavorite = (currentWord: string) => () => {
    const favorite = (isFavorite ? favorites : words).find(({ word }) => word === currentWord);

    if (favorite) {
      dispatch({
        type: isFavorite ? REMOVE : ADD,
        payload: favorite,
      });
    }
  };

  const handleChecked = (currentFilter: WordFilter) => () => {
    setWordFilters(
      wordFilters.includes(currentFilter)
        ? wordFilters.filter((wordFilter) => wordFilter !== currentFilter)
        : [...wordFilters, currentFilter],
    );
  };

  const handleChangeTab = () => {
    setActive(isFavorite ? 0 : 1);
  };

  const handleDragEnd: OnDragEndResponder = ({ source: { index }, destination }) => {
    if (destination) {
      dispatch({
        type: REORDER,
        payload: {
          destination: destination.index,
          source: index,
        },
      });
    }
  };

  return (
    <StyledContainer>
      <Header>
        <Logo>Word Keeper</Logo>
      </Header>
      <Title>Search Words</Title>
      <Content>
        <div>
          <StyledInput
            value={query}
            onChange={handleChange}
            type="text"
            placeholder="Searching..."
          />
          {!isFavorite && (
            <>
              <hr />
              <ButtonLoad onClick={handleLoadWords}>Загрузить слова</ButtonLoad>
            </>
          )}
          <hr />
          <CheckboxContainer>
            {checkBoxValues.map((data) => (
              <Checkbox
                type="checkbox"
                key={data.value}
                {...data}
                checked={wordFilters.includes(data)}
                onChange={handleChecked(data)}
              />
            ))}
          </CheckboxContainer>
          <StyledButton onClick={handleChangeTab}>
            {isFavorite ? 'To Saved Words' : 'To Favorite Words'}
          </StyledButton>
        </div>
        {state === REJECTED && <span>Error load words!</span>}
        {state === PENDING && <span>Loading words...</span>}
        {state === RESOLVED && (
          <TabContent
            words={isFavorite ? favoritesView : wordsView}
            originalWords={isFavorite ? favorites : words}
            isFavoriteTab={isFavorite}
            onToggleOpen={handleToggleOpen}
            onFavorite={handleFavorite}
            onDragEnd={handleDragEnd}
            activeWord={activeWord}
          />
        )}
      </Content>
    </StyledContainer>
  );
};

export default SinglePage;
