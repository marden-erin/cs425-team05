import styled, { css } from 'styled-components';
import { COLORS } from '../../constants';


const Box_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 15px;
`;
const Box = styled.div`
  width: 999px;
  height: 400px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 22px;
  margin-top: 30px;
  margin: 10px;
  padding: 15px;
  text-align: center;
`;

export {Box_Wrapper, Box}