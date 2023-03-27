import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { SubTitle, Label as BaseLabel, P } from '../../simple-components';
import Search from './Search';

type BookSearchCardProps = {
  /**
   * The text that shows immediately below the heading
   */
  additionalText?: string;
  /**
   * The key for this card, used to differentiate labels/search
   */
  cardKey: React.Key;
};

const CardWrapper = styled.div`
  margin: 2rem 0rem;
  padding: 2rem;
  height: 100%;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const SearchWrapper = styled.div`
  padding: 1.25rem;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;

const Header = styled(SubTitle)`
  color: ${COLORS.PURPLE_MID};
  font-weight: bold;
`;

const Label = styled(BaseLabel)`
  font-weight: bold;
`;

export const BookSearchCard = ({
  additionalText,
  cardKey,
}: BookSearchCardProps) => {
  const searchId = 'card-search-' + cardKey;
  return (
    <CardWrapper>
      <TextWrapper>
        <Header>Find a Book</Header>
        <P>{additionalText}</P>
      </TextWrapper>
      <SearchWrapper>
        <Label htmlFor={searchId}>Search for Books</Label>
        <Search overrideId={searchId} />
      </SearchWrapper>
    </CardWrapper>
  );
};

export default BookSearchCard;
