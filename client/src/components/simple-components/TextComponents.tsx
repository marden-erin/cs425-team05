import styled, { css } from 'styled-components';

import { COLORS, FONTS_MAIN, FONTS_SECONDARY } from '../../constants';

// This styling isn't final; just for testing and to demonstrate how we can use styled-components.
const TextCss = css`
  color: ${COLORS.BLURPLE};
`;

const H1 = styled.h1`
  ${TextCss}
  ${FONTS_MAIN}
    font-size: 10rem;
`;

const SubTitle = styled.span`
  ${FONTS_MAIN}
  font-weight: 200;
  font-size: 2rem;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${COLORS.WHITE};
`;

const H2 = styled.h2`
  ${TextCss}
  ${FONTS_MAIN}
    font-size: 2.4rem;
`;

const P = styled.p`
  ${TextCss}
  ${FONTS_SECONDARY}
    font-size: 1.6rem;
`;

export { H1, H2, P, SubTitle };
