import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN, FONTS_SECONDARY } from '../../../constants';

type SmallBookCardType = {
  /**
   * Title of the book
   */
  bookTitle: string;
  /**
   * Author of the book
   */
  authorName: string[];
  /**
   * Image of book cover
   */
  bookCover: any;
  /**
   * Whether this card is the currently selected one
   */
  selected?: boolean;
};

const ResultWrapper = styled.div<{ selected?: boolean }>`
  width: 44rem;
  height: 10rem;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  padding: 8px 13px;

  display: flex;
  align-items: center;
  gap: 22px;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${COLORS.PURPLE_LIGHT};
      border: 4px solid ${COLORS.PURPLE_MID};
    `}
`;


//TODO: have cover wrapper adjust to image size
const CoverWrapper = styled.div`
  width: 60px;
  height: 90px;
  background-color: ${COLORS.PURPLE_DARK};
  border: 3px solid ${COLORS.PURPLE_MID};
  overflow-y: hidden;
  max-width-inline: 100%;

`;

const TextWrapper = styled.div`
  // Setting maxes to handle overflow
  max-width: 30rem;
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Using special headers because the styling on this page doesn't match other pages
const TitleH2 = styled.h2`
  ${FONTS_SECONDARY};
  font-style: italic;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2rem;
  color: ${COLORS.PURPLE_DARK};
`;

const AuthorH3 = styled.h3`
  ${FONTS_MAIN};
  font-weight: 200;
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: ${COLORS.BLACK};
`;

export const SmallBookCard = ({
  bookTitle,
  authorName,
  bookCover,
  selected,
}: SmallBookCardType) => {
  return (
    <ResultWrapper selected={selected} className="small-book-card">
      <CoverWrapper>{bookCover}</CoverWrapper>
      <TextWrapper>
        <TitleH2>{bookTitle}</TitleH2>
        <AuthorH3>{authorName}</AuthorH3>
      </TextWrapper>
    </ResultWrapper>
  );
};

export default SmallBookCard;
