import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import { COLORS } from '../../constants';

// This styling isn't final; just for testing and to demonstrate how we can use styled-components.
const TextCss = css`
    color: ${COLORS.BLUE_DARK};
`;

const H1 = styled.h1`
    ${TextCss}

    font-size: 10rem;
`;

const P = styled.p`
    ${TextCss}

    font-size: 1.6rem;
`;

export { H1, P };
