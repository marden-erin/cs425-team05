import styled, { css } from 'styled-components';

import { COLORS, GRADIENTS } from '../../constants';
import { ColorType } from '../../types';

const ButtonCss = css`
  transition: background-color 0.75s ease-out;
`;

const ColorCss = (color: ColorType) => {
  switch (color) {
    case 'green':
      return css``; // POST-PROTOTYPE TODO: Add green css
    default: // Assuming purple for buttons
      return css`
        color: ${COLORS.WHITE};
        background: ${GRADIENTS.PURPLE};
        border: 1px solid ${COLORS.WHITE};

        :hover {
          background: ${COLORS.PURPLE_DARK};
        }
      `;
  }
};

const HalfRoundedCss = css`
  border-radius: 0px 5px 5px 0px;
`;

const RoundedCss = css`
  border-radius: 5px;
`;

const SmallCss = css`
  font-size: 1.6rem;
  padding: 0.7rem 0.8rem;
`;

const LargeCss = css`
  font-size: 2rem;
  padding: 1.4rem 2rem;
`;

// TODO: Parameterize sizes, roundness
const SmallHalfRoundedButton = styled.button<{ color?: ColorType }>`
  ${ButtonCss}
  ${HalfRoundedCss}
    ${SmallCss}

    ${(props) => ColorCss(props.color)}
`;

const SmallRoundedButton = styled.button<{ color?: ColorType }>`
  ${ButtonCss}
  ${RoundedCss}
    ${SmallCss}

    ${(props) => ColorCss(props.color)}
`;

const LargeRoundedButton = styled.button<{ color?: ColorType }>`
  ${ButtonCss}
  ${RoundedCss}
    ${LargeCss}

    ${(props) => ColorCss(props.color)}
`;

// Looks like a button, but is a link
const LargeRoundedLink = styled.a<{ color?: ColorType }>`
  ${ButtonCss}
  ${RoundedCss}
    ${LargeCss}

  text-align: center;
  text-decoration: none;

    ${(props) => ColorCss(props.color)}
`;

export { LargeRoundedButton, LargeRoundedLink, SmallHalfRoundedButton, SmallRoundedButton };
