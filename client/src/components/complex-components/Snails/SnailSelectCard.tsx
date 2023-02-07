import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '../../../constants';
import { H2 } from '../../simple-components';

import BlueDefaultSnail from '../../../imgs/snails/blue-default.png';
import PinkDefaultSnail from '../../../imgs/snails/pink-default.png';
import YellowDefaultSnail from '../../../imgs/snails/yellow-default.png';

type SnailSelectCardTypes = {
    /**
     * The color of the snail to be shown
     */
    color: string;
    /**
     * If selected
     */
    selected?: boolean;
}

const CardWrapper = styled.div<{$selected?: boolean}>`
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
    h2 {
        color: ${COLORS.WHITE};
    }
    img {
        filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
  }

  ${(props) => props.$selected && css `
    background-color: ${COLORS.PURPLE_MID};
    border: 5px solid ${COLORS.PURPLE_LIGHT};
    h2 {
        color: ${COLORS.WHITE};
    }
    img {
        filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
  `}
`;

function GetSnailImg(capitalizedColor: string) {
    if(capitalizedColor === 'Blue') {
        return BlueDefaultSnail;
    }
    if(capitalizedColor === 'Pink') {
        return PinkDefaultSnail;
    }
    else { // Fallback
        return YellowDefaultSnail;
    }
}

export const SnailSelectCard = ({color, selected}: SnailSelectCardTypes) => {
    const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase(); // Proper capitalization for header

    return(
        <CardWrapper $selected={selected}>
            <H2>{capitalizedColor}</H2>
            <img src={GetSnailImg(capitalizedColor)} width="275"/>
        </CardWrapper>
    );
}

export default SnailSelectCard;