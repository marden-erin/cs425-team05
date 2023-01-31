import React from 'react';
import styled from 'styled-components';
import { COLORS, FONTS_MAIN, FONTS_SECONDARY } from '../../../constants';

type SmallBookCardType = {
  /**
   * Title of the book
   */
  bookTitle: string;
  /**
   * Author of the book
   */
  authorName: string;
  /**
   * Image of book cover
   */
  bookCover: any;
};

const ResultWrapper = styled.div`
  width: 45.5rem;
  height: 13rem;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  padding: 8px 13px;

  display: flex;
  align-items: center;
  gap: 22px;
`;

const CoverWrapper = styled.div`
  width: 8rem;
  height: 12rem;
  background-color: ${COLORS.PURPLE_DARK};
  border: 3px solid ${COLORS.PURPLE_MID};
`;

const TextWrapper = styled.div`
  // Setting maxes to handle overflow
  max-width: 32rem;
  max-height: 13rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Using special headers because the styling on this page doesn't match other pages
const TitleH2 = styled.h2`
  ${FONTS_SECONDARY};
  font-style: italic;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.4rem;
  color: ${COLORS.PURPLE_DARK};
`;

const AuthorH3 = styled.h3`
  ${FONTS_MAIN};
  font-weight: 200;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: ${COLORS.BLACK};
`;

export const SmallBookCard = ({
  bookTitle,
  authorName,
  bookCover,
}: SmallBookCardType) => {
  return (
    <ResultWrapper>
      <CoverWrapper></CoverWrapper>
      <TextWrapper>
        <TitleH2>{bookTitle}</TitleH2>
        <AuthorH3>{authorName}</AuthorH3>
      </TextWrapper>
    </ResultWrapper>
  );
};

export default SmallBookCard;
