import React from 'react';
import styled, { css } from 'styled-components';
import { NumberOfDaysUntilDate } from '../../../utils';
import { COLORS } from '../../../constants';
import { P, SmallRoundedButton } from '../../simple-components';
import { useNavigate } from 'react-router-dom';

type GoalCardType = {
  /**
   * Title of the book used for alt text
   */
  bookTitle: string;
  /**
   * Image of book cover
   */
  bookCover: any;
  /**
   * Date goal is due
   */
  dueDate: Date;
  /**
   * button to navigate and pass state
   */
  updateFunction: any;
  /**
   * button for deleting goal
   */
  deleteFunction: any;
};

const ResultWrapper = styled.div`
  width: 18rem;
  height: 40rem;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  padding: 8px 13px;
  margin: 0.5rem 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-block-end: 0.7rem;
  }
`;

//TODO: have cover wrapper adjust to image size
const CoverWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  width: 15rem;
  background-color: ${COLORS.PURPLE_DARK};
  border: 3px solid ${COLORS.PURPLE_MID};
  overflow-y: hidden;
  max-width-inline: 100%;
  margin-block-end: 1.5rem;
  margin-block-start: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const GoalCard = ({
  bookTitle,
  bookCover,
  dueDate,
  updateFunction,
  deleteFunction,
}: GoalCardType) => {
  const navigate = useNavigate();
  return (
    <ResultWrapper className="book-card">
      <CoverWrapper>
        <img
          style={{ width: '100%' }}
          src={bookCover}
          alt={bookTitle + ' book cover'}
        />
      </CoverWrapper>
      <P>
        Due Date: <b>{dueDate.toLocaleDateString()}</b>
      </P>
      <P>
        Days left: <b>{NumberOfDaysUntilDate(dueDate)}</b>
      </P>
      <ButtonWrapper>
        <>{updateFunction}</>
        <>{deleteFunction}</>
      </ButtonWrapper>
    </ResultWrapper>
  );
};

export default GoalCard;
