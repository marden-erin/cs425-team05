import styled, { css } from 'styled-components';

import { COLORS } from '../../constants';


// NOTE: Inputs stretch to fill width of container.



const InputCss = css`
  flex-grow: 1;
  font-size: 1.6rem;
  text-indent: 30px;
  border: 1px solid ${COLORS.PURPLE_DARK};
  

  :focus {
    outline-style: 2px solid ${COLORS.WHITE};
    border: 4px solid ${COLORS.PURPLE_MID};
  }
`;

const ThinInput = styled.input`
  ${InputCss};
  width: 30rem;
  padding: 0.60rem;
`;

const ThickInput = styled.input`
  ${InputCss};
  padding: 1rem 1.2rem;
`;

export { ThickInput, ThinInput };
