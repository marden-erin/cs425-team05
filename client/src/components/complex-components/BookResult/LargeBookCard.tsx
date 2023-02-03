import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN, FONTS_SECONDARY } from '../../../constants';
import { LargeRoundedButton, Pill, P } from '../../simple-components';
import { StarRating } from '../Reviews';

type LargeBookCardType = {
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
  /**
   * The book's genres
   */
  genres?: string[];
};

const CardWrapper = styled.div`
  width: 40rem;
  height: 50rem;
  padding: 20px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoverWrapper = styled.div`
  width: 133.3px;
  height: 200px;
  background-color: ${COLORS.PURPLE_DARK};
  border: 3px solid ${COLORS.PURPLE_MID};
`;

const TopWrapper = styled.div`
  width: 380px;
  height: 25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoWrapper = styled.div`
  width: 225px;
  min-height: 200px;
  max-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PillWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

// Using special headers because the styling on this page doesn't match other pages
const TitleH2 = styled.h2`
  ${FONTS_SECONDARY};
  font-style: italic;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.2rem;
  text-align: center;
  color: ${COLORS.PURPLE_DARK};
`;

const AuthorH3 = styled.h3`
  ${FONTS_MAIN};
  font-weight: 200;
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: ${COLORS.BLACK};
`;

const BotWrapper = styled.div`
  width: 290px;
  height: 170px;
  padding: 30px;
  background-color: ${COLORS.PURPLE_LIGHT};

  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
`;

const GoalH3 = styled.h3`
  ${FONTS_SECONDARY};
  font-weight: 400;
  font-size: 2.2rem;
  line-height: 2.4rem;
  text-align: center;
  color: ${COLORS.BLUE_MID};
`;

export const LargeBookCard = ({
  bookTitle,
  authorName,
  bookCover,
  genres,
}: LargeBookCardType) => {
  return (
    <CardWrapper>
      <TopWrapper>
        <CoverWrapper></CoverWrapper>
        <InfoWrapper>
          <TitleH2>{bookTitle}</TitleH2>
          <AuthorH3>by {authorName}</AuthorH3>
          {genres && (
            <PillWrapper>
              {genres.map((genre, index) => (
                <Pill key={index}>{genre}</Pill>
              ))}
            </PillWrapper>
          )}
          <StarRating rating={3} />
        </InfoWrapper>
      </TopWrapper>
      <BotWrapper>
        <GoalH3>No Goal Set!</GoalH3>
        <P centered>
          Join <b>Erin Keith</b> and 3 other friends by setting a reading goal
        </P>
        <LargeRoundedButton>Set Goal</LargeRoundedButton>
      </BotWrapper>
    </CardWrapper>
  );
};

export default LargeBookCard;
