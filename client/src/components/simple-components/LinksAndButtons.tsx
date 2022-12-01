import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import { COLORS } from '../../constants';

type Size = 'small' | 'large'; // Medium is default, only specify exceptions

// *TODO: Fix color contrast a11y failure
const ButtonCss = css<{ size?: Size }>`
    background-color: ${COLORS.PURPLE_LIGHT};
    color: ${COLORS.WHITE};
    padding: 8px 18px;
    font-size: 1.8rem;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: background-color 0.75s ease-out;

    :hover {
        background-color: ${COLORS.PURPLE_MID}
    }
`;

const RoundedButton = styled.button<{ size?: Size }>`
    border-radius: 12px;
    ${ButtonCss}
`;

export { RoundedButton };
