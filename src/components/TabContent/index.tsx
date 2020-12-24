import React, { FC, useEffect, useRef } from 'react';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useFavorites } from '../../store';
import { TabContentProps } from './interfaces';
import {
  WordItem,
  ButtonMore,
  WordInfo,
  WordDetail,
  StyledExcerpt,
  Pronunciation,
  ButtonFavorite,
} from './styled';

const TabContent: FC<TabContentProps> = ({
  words,
  originalWords,
  onToggleOpen,
  onFavorite,
  onDragEnd,
  isFavoriteTab,
  activeWord,
}) => {
  const [favorites] = useFavorites();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      el.style.minHeight = `${el.offsetHeight}px`;
    }
  }, [words]);

  return (
    <div ref={containerRef}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="words">
          {(provided) => (
            <>
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {words.map(({ word, results, pronunciation }) => {
                  const isOpen = word === activeWord;
                  const isFavorite =
                    favorites.find((favorite) => favorite.word === word) !== undefined;
                  const originalIdx = originalWords.findIndex(
                    (originalWord) => originalWord.word === word,
                  );

                  return (
                    <Draggable
                      key={word}
                      index={originalIdx}
                      draggableId={word}
                      isDragDisabled={!isFavoriteTab}
                    >
                      {(providedDraggable) => (
                        <WordItem
                          isOpen={isOpen}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          ref={providedDraggable.innerRef}
                        >
                          <ButtonMore onClick={onToggleOpen(word)} disabled={results.length === 0}>
                            {isOpen ? '-' : '+'}
                          </ButtonMore>
                          <strong>{word}</strong>
                          <WordInfo>
                            {results.map(({ definition, partOfSpeech, synonyms }: any) => (
                              <React.Fragment key={definition}>
                                <i>{partOfSpeech}</i>
                                <WordDetail>
                                  <StyledExcerpt>{definition}</StyledExcerpt>
                                  {isOpen && synonyms && (
                                    <p>
                                      <strong>Synonyms: </strong>
                                      {synonyms.join(', ')}
                                    </p>
                                  )}
                                </WordDetail>
                              </React.Fragment>
                            ))}
                            {isOpen && pronunciation && (
                              <Pronunciation>
                                <p>
                                  <strong>Pronunciation: </strong>
                                  {pronunciation.all}
                                </p>
                              </Pronunciation>
                            )}
                          </WordInfo>
                          <ButtonFavorite
                            disabled={isFavorite && !isFavoriteTab}
                            isFavorite={isFavorite}
                            onClick={onFavorite(word)}
                          >
                            &#9733;
                          </ButtonFavorite>
                        </WordItem>
                      )}
                    </Draggable>
                  );
                })}
              </div>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TabContent;
