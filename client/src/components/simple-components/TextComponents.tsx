import styled, { css } from 'styled-components';

import { COLORS, FONTS_MAIN, FONTS_SECONDARY} from '../../constants';

// This styling isn't final; just for testing and to demonstrate how we can use styled-components.
const TextCss = css`
    color: ${COLORS.BLURPLE};
`;

const H1 = styled.h1`
    ${TextCss}
    ${FONTS_MAIN}

    font-size: 10rem;
`;

const P = styled.p`
    ${TextCss}
    ${FONTS_SECONDARY}

    font-size: 1.6rem;
`;

export { H1, P };
