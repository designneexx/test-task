import { SearchWords, Word } from './interfaces';

export const fetchWordsApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${url}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'd056004aaemsh45df73b2cc893a1p1d896cjsn06cb1aadb495',
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    },
  });

  return response.json();
};

export const getWords = (query: string): Promise<SearchWords> => {
  return fetchWordsApi<SearchWords>(`?letterPattern=^${query.trim()}&limit=10&page=1`);
};

export const getDetailWord = (word: string): Promise<Word> => fetchWordsApi<Word>(word);
