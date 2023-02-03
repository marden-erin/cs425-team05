import React from 'react';
import styled from 'styled-components';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FONTS_SECONDARY, COLORS } from '../../../constants';
import { Label, VisuallyHiddenSpan } from '../../simple-components';

type StarRatingType = {
  /**
   * The rating, 1-5 of the book
   */
  rating: number;
};

const StarWrapper = styled.div`
  display: flex;
`;

const Stars = styled.div`
  display: flex;
  margin-top: 1px;
  gap: 2px;
  svg {
    height: 1.75rem;
    width: 1.75rem;
    stroke: ${COLORS.BLUE_MID};
    fill: ${COLORS.BLUE_MID};
  }
`;

export const StarRating = ({ rating }: StarRatingType) => {
  let numRating = rating;
  if (rating < 0) {
    numRating = 0;
  } else if (rating > 5) {
    numRating = 5;
  }
  const hiddenText = numRating + ' out of 5 stars';
  return (
    <StarWrapper>
      <Label htmlFor="star-rating">Rating:</Label>
      <Stars id="star-rating">
        {Array.from({ length: numRating }).map((e, i) => (
          <AiFillStar role="presentation" key={i} />
        ))}
        {Array.from({ length: 5 - numRating }).map((e, index) => (
          <AiOutlineStar role="presentation" key={index + numRating} />
        ))}
        <VisuallyHiddenSpan>{hiddenText}</VisuallyHiddenSpan>
      </Stars>
    </StarWrapper>
  );
};

export default StarRating;
