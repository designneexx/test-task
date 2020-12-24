import { Word, WordView } from '../../api/interfaces';
import { WordFilter } from './interfaces';

interface HandleWordFilter {
  words: Word[];
  activeWord: string;
  wordFilters: WordFilter[];
}

export const filterWords = ({ words, activeWord, wordFilters }: HandleWordFilter): WordView[] => {
  const filterValues = wordFilters.map(({ value }) => value);

  return words
    .map(({ word, results = [], ...allData }) => ({
      ...allData,
      word,
      results: activeWord === word ? results : results.slice(0, 1),
    }))
    .filter(
      ({ results }) =>
        results.length === 0 ||
        results.some(
          ({ partOfSpeech }) => filterValues.length === 0 || filterValues.includes(partOfSpeech),
        ),
    );
};
