import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '../../../constants';
import { H3 } from '../../simple-components';

import { GetFoodImg, GetFoodAffect } from '../../../utils';

type FoodSelectCardTypes = {
  /**
   * The color of the shroom to be shown
   */
  color: string;
  /**
   * Name of the radio group
   */
  name: string;
  /**
   * Result so far
   */
  result: string;
  /**
   * Changes result when this radio is clicked
   */
  changeResult: React.Dispatch<React.SetStateAction<string>>;
};

const CardWrapper = styled.div`
  width: 30rem;
  height: 32.5rem;
`;

const CardStyler = styled.div`
  width: 25rem;
  height: 30rem;
  padding: 30px 20px;
  background-color: ${COLORS.PURPLE_LIGHT};
  box-shadow: 10px 10px 10px #220d50;
  transition: background-color 0.25s ease-out;
  border-radius: 15px;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  :hover {
    background-color: ${COLORS.PURPLE_MID};
    cursor: pointer;
    h3 {
        color: ${COLORS.WHITE};
    }
    img {
        filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
  }
}
`;

const Input = styled.input`
  position: absolute;
  height: 40rem;
  width: 29rem;
  margin-left: 0.5rem;
  z-index: 10;
  opacity: 0;
  :hover {
    cursor: pointer;
  }

  :hover + .card {
    background-color: ${COLORS.PURPLE_MID};
    cursor: pointer;
    h3 {
      color: ${COLORS.WHITE};
    }
    img {
      filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
    span {
      color: ${COLORS.WHITE};
    }
  }

  :checked + .card {
    background-color: ${COLORS.PURPLE_MID};
    border: 5px solid ${COLORS.PURPLE_LIGHT};
    h3 {
      color: ${COLORS.WHITE};
    }
    img {
      filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
    span {
      color: ${COLORS.WHITE};
    }
  }
`;

const Span = styled.span`
  color: ${COLORS.PURPLE_DARK};
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;

  padding: 0 1rem;
`;

export const FoodSelectCard = ({
  color,
  name,
  result,
  changeResult,
}: FoodSelectCardTypes) => {
  const capitalizedColor =
    color.charAt(0).toUpperCase() + color.slice(1).toLowerCase(); // Proper capitalization for header

  return (
    <CardWrapper>
      <Input
        type="radio"
        name={`${name}-radio`}
        value={color}
        checked={result === color}
        onChange={() => {
          changeResult(color);
        }}
      />
      <CardStyler className="card">
        <H3>{capitalizedColor}</H3>
        <img src={GetFoodImg(capitalizedColor)} width="200" />
        <Span>{GetFoodAffect(capitalizedColor)}</Span>
      </CardStyler>
    </CardWrapper>
  );
};

export default FoodSelectCard;
