import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import { COLORS, FONTS_MAIN, FONTS_SECONDARY} from '../../constants';

// NOTE: Inputs stretch to fill width of container.

// POST PROTOTYPE TODO: Split up like Button
const Input = styled.input`
    width: auto;
    flex-grow: 1;

    font-size: 1.6rem;
    
    border: 1px solid ${COLORS.PURPLE_DARK};

    :focus {
        outline-style: 2px solid ${COLORS.WHITE};
        border: 4px solid ${COLORS.PURPLE_MID};
    }
`;

export { Input };