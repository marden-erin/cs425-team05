import styled, { css } from 'styled-components';
import { COLORS, GRADIENTS } from '../../constants';

const Box_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 15px;
`;
const Box = styled.div`
  width: 100rem;
  height: 40rem;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 15px;
  margin-top: 30px;
  margin: 10px;
  padding: 15px;
  text-align: center;
`;

export { Box_Wrapper, Box };
