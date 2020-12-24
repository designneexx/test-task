import styled, { css } from 'styled-components';

export const StyledExcerpt = styled.p`
  margin: 0;
  border-radius: 4px;
`;

export const WordDetail = styled.div`
  overflow: hidden;
`;

export const Pronunciation = styled.div`
  grid-column: span 2;
`;

export const WordInfo = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 10px;
`;

export const ButtonFavorite = styled.button<{ isFavorite: boolean }>(
  ({ isFavorite, disabled }) => css`
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    cursor: pointer;
    border: 1px solid #2196f3;
    color: #2196f3;
    ${isFavorite &&
    `
      background-color: #2196f3;
      color: #fff;
    `}
    ${disabled &&
    `
      cursor: default;
      opacity: 0.7;
    `}
  `,
);

export const WordItem = styled.div<{ isOpen: boolean }>(
  ({ isOpen }) => css`
    display: grid;
    max-width: 100%;
    grid-template-columns: max-content max-content 1fr 7%;
    grid-template-rows: ${isOpen ? '25px 1fr' : '1fr'};
    grid-gap: 10px;
    align-items: center;
    padding: 14px;
    background-color: #f3f3f3;
    margin-bottom: 15px;
    ${WordInfo} {
      ${isOpen &&
      `
        grid-row: span 2;
        margin-top: 2px;
      `}
    }
    ${StyledExcerpt} {
      ${!isOpen &&
      `
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
      `}
    }
  `,
);

export const ButtonMore = styled.button`
  width: 30px;
  border: 1px solid;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;
