import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '../../../constants';
import { H2 } from '../../simple-components';

import { GetSnailImg } from '../../../utils';

type SnailSelectCardTypes = {
    /**
     * The color of the snail to be shown
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
}

const CardWrapper = styled.div`
width: 30rem;
height: 32.5rem;
`;

const CardStyler = styled.div`
  width: 30rem;
  height: 32.5rem;
  padding: 30px 15px;
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
    h2 {
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
    height: 42rem;
    width: 32rem;
    margin-left: 0.5rem;
    z-index: 10;
    opacity: 0;
    :hover {
        cursor: pointer;
    }

    :hover + .card {
            background-color: ${COLORS.PURPLE_MID};
            cursor: pointer;
            h2 {
                color: ${COLORS.WHITE};
            }
            img {
                filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
            }

    }

    :checked + .card {
        background-color: ${COLORS.PURPLE_MID};
    border: 5px solid ${COLORS.PURPLE_LIGHT};
    h2 {
        color: ${COLORS.WHITE};
    }
    img {
        filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
    }
`;

export const SnailSelectCard = ({color, name, result, changeResult}: SnailSelectCardTypes) => {
    const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase(); // Proper capitalization for header

    return(
        <CardWrapper>
            <Input type="radio" name={`${name}-radio`} value={color} checked={result === color} onChange={() => {changeResult(color)}}/>
        <CardStyler className="card">
            <H2>{capitalizedColor}</H2>
            <img src={GetSnailImg(capitalizedColor)} width="275"/>
        </CardStyler>
        </CardWrapper>
    );
}

export default SnailSelectCard;