import { WordFilter } from './interfaces';

export const checkBoxValues: WordFilter[] = [
  { value: 'noun', label: 'Noun' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'numeral', label: 'Numeral' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'pronoun', label: 'Pronoun' },
  { value: 'verb', label: 'Verb' },
  { value: 'preposition', label: 'Preposition' },
  { value: 'conjunction', label: 'Conjunction' },
  { value: 'interjection', label: 'Interjection' },
];

export const RESOLVED = 'RESOLVED';
export const REJECTED = 'REJECTED';
export const PENDING = 'PENDING';
