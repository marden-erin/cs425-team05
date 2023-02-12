import styled from 'styled-components';
import { COLORS, FONTS_MAIN } from '../../constants';

const HR = styled.hr`
  margin-top: 4px;
  margin-bottom: 6px;
  border: 1.75px solid ${COLORS.PURPLE_LIGHT};
`;

const Pill = styled.span`
  ${FONTS_MAIN}
  color: ${COLORS.PURPLE_DARK};
  font-weight: 200;
  font-size: 1.1rem;
  letter-spacing: 0.02em;

  background-color: ${COLORS.PURPLE_LIGHT};
  padding: 3px 7px;
  border-radius: 15px;
`;

export { HR, Pill };
