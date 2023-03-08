import styled, { css } from 'styled-components';

import { COLORS, FONTS_MAIN, FONTS_SECONDARY } from '../../constants';

// This styling isn't final; just for testing and to demonstrate how we can use styled-components.
const TextCss = css`
  color: ${COLORS.PURPLE_DARK};
`;

const H1 = styled.h1`
  ${TextCss}
  ${FONTS_MAIN}
    font-size: 6rem;
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

const H3 = styled.h3`
  ${FONTS_MAIN}
    font-size: 2rem;
    color: ${COLORS.PURPLE_MID};
`;
const P = styled.p<{ centered?: boolean }>`
  ${TextCss}
  ${FONTS_SECONDARY}
    font-size: 1.6rem;
  b {
    font-size: 1.6rem;
    color: ${COLORS.BLUE_MID};
  }

  ${(props) =>
    props.centered &&
    css`
      text-align: center;
    `}
`;

const Label = styled.label`
  ${FONTS_MAIN};
  color: ${COLORS.PURPLE_MID};
  font-size: 1.6rem;
  letter-spacing: 0.02em;
  margin-inline-end: 3px;
`;

const Author = styled.span`
  ${FONTS_SECONDARY}

  font-size: 2rem;
  font-weight: 100;
  color: ${COLORS.BLUE_DARK};
  text-align: center;
`;
const PageCount = styled.span`
  ${FONTS_SECONDARY}
  font-size: 1.25rem;
  font-weight: 50;
  color: ${COLORS.BLUE_DARK};
  text-align: center;
`;
const BookTitle = styled.span`
  ${FONTS_MAIN}
  font-size: 4rem;
  font-weight: 200;
  color: ${COLORS.BLUE_DARK};
  text-align: center;
`;

export { H1, H2, H3, P, SubTitle, Author, PageCount, BookTitle, Label };
