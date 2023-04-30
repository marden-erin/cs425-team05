import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  COLORS,
  FONTS_MAIN,
  FONTS_SECONDARY,
  ScrollBarStyle,
} from '../../../constants';
import { P } from '../../simple-components';

type LargeBookCardType = {
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
   * The book's genres
   */

  description: string;
  /**
   *
   */
  AddClusterFunction: any;
  CreateGoalFunction: any;
  tempFunction?: any;
  /**
   * Whether to display buttons like "Set Goal" or "Add Review"
   */
  pageCount?: number;

  showButtons?: boolean;
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
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  width: 133.3px;
  background-color: ${COLORS.PURPLE_MID};
  border: 3px solid ${COLORS.PURPLE_MID};
  max-width-inline: 100%;
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
  min-height: 100px;
  max-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  display: -webkit-box;
  max-width: 400px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AuthorH3 = styled.h3`
  ${FONTS_MAIN};
  font-weight: 200;
  font-size: 1.4rem;
  line-height: 1.6rem;
  text-align: center;
  color: ${COLORS.BLACK};
  display: -webkit-box;
  max-width: 400px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropWrapper = styled.div`
  margin-left: 15%;
  display: flex;
  justify-content: center;
`;
const AllButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15%;
`;

const BotWrapper = styled.div`
  width: 290px;
  height: 170px;
  padding: 30px;
  margin-top: 5%;
  background-color: ${COLORS.PURPLE_LIGHT};
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
`;

const TextWrapper = styled.div`
  display: flex;
  ${ScrollBarStyle};
  background-color: ${COLORS.PURPLE_LIGHT};

  width: 290px;
  height: 170px;
  padding-right: 5px;
  overflow-y: auto;
`;

export const LargeBookCard = ({
  bookTitle,
  authorName,
  bookCover,
  description,
  AddClusterFunction,
  CreateGoalFunction,
  tempFunction,
  pageCount,
  showButtons = true,
}: LargeBookCardType) => {
  const navigate = useNavigate();
  return (
    <CardWrapper>
      <TopWrapper>
        <CoverWrapper>{bookCover}</CoverWrapper>
        <InfoWrapper>
          <TitleH2>{bookTitle}</TitleH2>
          <AuthorH3>by {authorName}</AuthorH3>
          <AllButtonWrapper>
            {showButtons && (
              <>
                <>{CreateGoalFunction}</>
              </>
            )}
            <DropWrapper>
              {' '}
              {tempFunction}
              {AddClusterFunction}
            </DropWrapper>
          </AllButtonWrapper>
        </InfoWrapper>
      </TopWrapper>
      <BotWrapper>
        <TextWrapper>
          <P> {description}</P>
        </TextWrapper>
      </BotWrapper>
    </CardWrapper>
  );
};

export default LargeBookCard;
