import { OnDragEndResponder } from 'react-beautiful-dnd';
import { Word, WordView } from '../../api/interfaces';

export interface TabContentProps {
  words: WordView[];
  originalWords: Word[];
  onToggleOpen: (word: string) => () => void;
  onFavorite: (word: string) => () => void;
  onDragEnd: OnDragEndResponder;
  isFavoriteTab: boolean;
  activeWord: string;
}
